// src/app/api/payments/history/route.ts
import { dbConnect } from "@/lib/mongoose";
import Payment from "@/models/Payment";
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
 * GET /api/payments/history
 * Fetch payment history for the authenticated user
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
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const status = searchParams.get("status") || undefined;

    // ===== BUILD FILTER =====
    const filter: any = { userId: decoded.userId };
    if (status) filter.status = status;

    // ===== FETCH PAYMENTS =====
    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("referenceId");

    const total = await Payment.countDocuments(filter);

    // ===== RETURN RESPONSE =====
    return NextResponse.json(
      {
        data: payments,
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
    console.error("❌ Payment history fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment history" },
      { status: 500 }
    );
  }
}
