// src/app/api/service-requests/create/route.ts
import { dbConnect } from "@/lib/mongoose";
import ServiceRequest from "@/models/ServiceRequest";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    const validServiceTypes = ["repair", "maintenance", "inspection", "cleaning"];
    if (!validServiceTypes.includes(serviceType)) {
      return NextResponse.json(
        { 
          error: `Invalid service type. Must be one of: ${validServiceTypes.join(", ")}` 
        },
        { status: 400 }
      );
    }

    // ===== CREATE SERVICE REQUEST =====
    const serviceRequest = new ServiceRequest({
      carOwnerId: decoded.userId,
      serviceType,
      problemDescription,
      carDetails: carDetails || {},
      location,
      latitude: latitude || 0,
      longitude: longitude || 0,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      preferredTime,
      images: Array.isArray(body.images) ? body.images : [],
      status: "open",
    });

    await serviceRequest.save();

    // ===== RETURN RESPONSE =====
    return NextResponse.json(
      {
        message: "✅ Service request created successfully. We'll assign a garage soon.",
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