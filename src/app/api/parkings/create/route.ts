// src/app/api/parkings/create/route.ts
import { dbConnect } from "@/lib/mongoose";
import Parking from "@/models/Parking";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    if (mongoose.Types.ObjectId.isValid(token)) {
      return { userId: token };
    }
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // ===== VERIFY TOKEN =====
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token) as any;
    
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ===== CHECK IF USER IS GARAGE OWNER =====
    await dbConnect();
    
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== "garage_owner") {
      return NextResponse.json(
        { error: "Only garage owners can create parkings" },
        { status: 403 }
      );
    }

    // ===== GET REQUEST BODY =====
    const body = await request.json();
    const {
      name,
      description,
      location,
      city,
      latitude,
      longitude,
      totalSpots,
      pricePerHour,
      pricePerDay,
      pricePerMonth,
      operatingHours,
      facilities,
      allowedVehicleTypes,
      images,
    } = body;

    // ===== VALIDATE REQUIRED FIELDS =====
    if (!name || !location || !city || totalSpots === undefined || !pricePerHour) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["name", "location", "city", "totalSpots", "pricePerHour"]
        },
        { status: 400 }
      );
    }

    // ===== CREATE PARKING =====
    const parking = new Parking({
      garageOwnerId: decoded.userId,
      name,
      description,
      location,
      city,
      latitude: latitude || 0,
      longitude: longitude || 0,
      totalSpots,
      availableSpots: totalSpots,
      pricePerHour,
      pricePerDay,
      pricePerMonth,
      operatingHours: operatingHours || { open: "06:00", close: "22:00" },
      facilities: facilities || [],
      allowedVehicleTypes: allowedVehicleTypes || ["sedan", "suv", "truck", "ev", "motorbike"],
      images: images || [],
      status: "active",
    });

    await parking.save();

    // ===== RETURN RESPONSE =====
    return NextResponse.json(
      {
        message: "✅ Parking created successfully.",
        parking,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ Create parking error:", error);
    return NextResponse.json(
      { error: "Failed to create parking" },
      { status: 500 }
    );
  }
}