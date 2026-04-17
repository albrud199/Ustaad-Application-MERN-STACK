// src/app/api/service-requests/create/route.ts
import { dbConnect } from "@/lib/mongoose";
import ServiceRequest from "@/models/ServiceRequest";
import Repairshop from "@/models/Repairshop";
import Conversation from "@/models/Conversation";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type ServiceType = "general" | "emergency" | "repair" | "maintenance" | "inspection" | "cleaning";

function normalizeServiceType(serviceType: string): { serviceType: ServiceType; serviceMode: "general" | "emergency" } {
  if (serviceType === "emergency" || serviceType === "maintenance") {
    return { serviceType: serviceType as ServiceType, serviceMode: "emergency" };
  }

  return {
    serviceType: serviceType === "repair" ? "general" : (serviceType as ServiceType),
    serviceMode: "general",
  };
}

function distanceKm(latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number) {
  const earthRadiusKm = 6371;
  const deltaLatitude = ((latitudeB - latitudeA) * Math.PI) / 180;
  const deltaLongitude = ((longitudeB - longitudeA) * Math.PI) / 180;
  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos((latitudeA * Math.PI) / 180) * Math.cos((latitudeB * Math.PI) / 180) *
      Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function pickRepairshop({
  latitude,
  longitude,
  repairshopId,
}: {
  latitude?: number;
  longitude?: number;
  repairshopId?: string;
}) {
  if (repairshopId) {
    const selected = await Repairshop.findOne({ _id: repairshopId, status: "active" }).populate("ownerId", "name email phone").lean();
    if (selected) return selected;
  }

  const shops = await Repairshop.find({ status: "active" }).populate("ownerId", "name email phone").lean();
  if (shops.length === 0) return null;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return shops[0];
  }

  return shops
    .map((shop) => ({
      shop,
      distance: distanceKm(latitude, longitude, Number(shop.latitude || 0), Number(shop.longitude || 0)),
    }))
    .sort((left, right) => left.distance - right.distance)[0]?.shop ?? shops[0];
}

function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // ===== VERIFY TOKEN =====
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token) as any;
    
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    await dbConnect();

    // ===== GET REQUEST BODY =====
    const body = await request.json();
    const {
      serviceType,
      problemDescription,
      carDetails,
      location,
      latitude,
      longitude,
      preferredDate,
      preferredTime,
      repairshopId,
    } = body;

    // ===== VALIDATE REQUIRED FIELDS =====
    if (!serviceType || !problemDescription || !location) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["serviceType", "problemDescription", "location"]
        },
        { status: 400 }
      );
    }

    // ===== VALIDATE SERVICE TYPE =====
    const validServiceTypes = ["general", "emergency", "repair", "maintenance", "inspection", "cleaning"];
    if (!validServiceTypes.includes(serviceType)) {
      return NextResponse.json(
        { 
          error: `Invalid service type. Must be one of: ${validServiceTypes.join(", ")}` 
        },
        { status: 400 }
      );
    }

    // ===== CREATE SERVICE REQUEST =====
    const normalized = normalizeServiceType(serviceType);
    const repairshop = await pickRepairshop({
      latitude: typeof latitude === "number" ? latitude : undefined,
      longitude: typeof longitude === "number" ? longitude : undefined,
      repairshopId: typeof repairshopId === "string" ? repairshopId : undefined,
    });

    const serviceRequest = new ServiceRequest({
      carOwnerId: decoded.userId,
      serviceType: normalized.serviceType,
      serviceMode: normalized.serviceMode,
      problemDescription,
      carDetails: carDetails || {},
      location,
      latitude: latitude || 0,
      longitude: longitude || 0,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      preferredTime,
      images: Array.isArray(body.images) ? body.images : [],
      status: repairshop ? "assigned" : "open",
      assignedRepairshopId: repairshop?._id,
      assignedRepairshopOwnerId: repairshop?.ownerId?._id || repairshop?.ownerId,
    });

    await serviceRequest.save();

    if (repairshop) {
      const conversation = await Conversation.create({
        serviceRequestId: serviceRequest._id,
        participants: [decoded.userId, repairshop.ownerId?._id || repairshop.ownerId],
        lastMessageAt: new Date(),
        lastMessagePreview: "Service request created.",
        status: "active",
      });

      serviceRequest.conversationId = conversation._id;
      await serviceRequest.save();
    }

    // ===== RETURN RESPONSE =====
    return NextResponse.json(
      {
        message: repairshop
          ? "✅ Service request created successfully and assigned to a repair shop."
          : "✅ Service request created successfully. We'll assign a repair shop soon.",
        serviceRequest,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ Create service request error:", error);
    return NextResponse.json(
      { error: "Failed to create service request" },
      { status: 500 }
    );
  }
}