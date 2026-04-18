// src/app/api/parkings/route.ts
import { dbConnect } from "@/lib/mongoose";
import Parking from "@/models/Parking";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Ensure User model is registered
    User;

    // ===== GET QUERY PARAMETERS =====
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const status = searchParams.get("status") || "active";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // ===== BUILD QUERY =====
    const query: any = { status };
    if (city) {
      query.city = { $regex: city, $options: "i" }; // Case-insensitive search
    }

    // ===== CALCULATE PAGINATION =====
    const skip = (page - 1) * limit;

    // ===== FETCH PARKINGS =====
    const parkings = await Parking.find(query)
      .populate("garageOwnerId", "name email phone garage ratings")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // ===== GET TOTAL COUNT =====
    const total = await Parking.countDocuments(query);

    // ===== RETURN RESPONSE =====
    return NextResponse.json({
      message: "✅ Parkings fetched successfully",
      data: parkings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error: any) {
    console.error("❌ Get parkings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch parkings" },
      { status: 500 }
    );
  }
}