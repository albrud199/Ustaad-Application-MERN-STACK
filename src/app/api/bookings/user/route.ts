// src/app/api/bookings/user/route.ts
import { dbConnect } from "@/lib/mongoose";
import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return null;
  }
}

/**
 * GET /api/bookings/user
 * Fetch all bookings for the authenticated car owner
 */
export async function GET(request: NextRequest) {
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

    // ===== GET QUERY PARAMETERS =====
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") || undefined;
    const limit = Number(searchParams.get("limit")) || 50;
    const skip = Number(searchParams.get("skip")) || 0;

    // ===== BUILD FILTER =====
    const filter: any = { carOwnerId: decoded.userId };
    if (status) filter.status = status;

    // ===== FETCH BOOKINGS WITH PARKING INFO =====
    const bookings = await Booking.find(filter)
      .populate("parkingId", "name location city pricePerHour images")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Booking.countDocuments(filter);

    // ===== CATEGORIZE BOOKINGS BY STATUS =====
    const now = new Date();
    const categorized = {
      active: bookings.filter(b => b.status === "active"),
      upcoming: bookings.filter(b => b.status === "confirmed" && new Date(b.startTime) > now),
      past: bookings.filter(b => b.status === "completed" || (b.status === "confirmed" && new Date(b.startTime) <= now)),
    };

    // ===== RETURN RESPONSE =====
    return NextResponse.json(
      {
        data: bookings,
        categorized,
        pagination: {
          total,
          limit,
          skip,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ User bookings fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user bookings" },
      { status: 500 }
    );
  }
}
