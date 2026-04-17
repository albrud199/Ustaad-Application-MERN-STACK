// src/app/api/bookings/create/route.ts
import { dbConnect } from "@/lib/mongoose";
import Booking from "@/models/Booking";
import Parking from "@/models/Parking";
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
      parkingId,
      startTime,
      endTime,
      vehicleDetails,
    } = body;

    // ===== VALIDATE REQUIRED FIELDS =====
    if (!parkingId || !startTime || !endTime || !vehicleDetails) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ===== VALIDATE DATES =====
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    if (start < new Date()) {
      return NextResponse.json(
        { error: "Start time cannot be in the past" },
        { status: 400 }
      );
    }

    // ===== CHECK PARKING EXISTS AND IS AVAILABLE =====
    const parking = await Parking.findById(parkingId);
    
    if (!parking) {
      return NextResponse.json(
        { error: "Parking not found" },
        { status: 404 }
      );
    }

    if (parking.status !== "active") {
      return NextResponse.json(
        { error: "This parking is not currently available" },
        { status: 400 }
      );
    }

    if (parking.availableSpots <= 0) {
      return NextResponse.json(
        { error: "No available spots at this parking" },
        { status: 400 }
      );
    }

    // ===== CALCULATE DURATION AND PRICE =====
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const totalPrice = durationHours * parking.pricePerHour;

    // ===== CREATE BOOKING =====
    const booking = new Booking({
      carOwnerId: decoded.userId,
      parkingId,
      startTime: start,
      endTime: end,
      duration: durationHours,
      totalPrice,
      vehicleDetails,
      status: "pending",
      paymentStatus: "pending",
    });

    await booking.save();

    // ===== UPDATE PARKING AVAILABLE SPOTS =====
    await Parking.findByIdAndUpdate(
      parkingId,
      { $inc: { availableSpots: -1 } }
    );

    // ===== RETURN RESPONSE =====
    return NextResponse.json(
      {
        message: "✅ Booking created successfully. Proceed to payment.",
        booking,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ Create booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}