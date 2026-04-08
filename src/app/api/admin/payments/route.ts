import { NextRequest, NextResponse } from "next/server";
import { dbConnect, isMongoConfigured } from "@/lib/mongoose";
import Payment from "@/models/Payment";

// GET /api/admin/payments — List all payments
export async function GET(request: NextRequest) {
  try {
    if (!isMongoConfigured()) {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);

      return NextResponse.json({
        payments: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
      });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const method = searchParams.get("method");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (method) filter.method = method;

    const skip = (page - 1) * limit;
    const [payments, total] = await Promise.all([
      Payment.find(filter)
        .populate("userId", "name email role")
        .populate("bookingId", "startTime endTime totalPrice")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Payment.countDocuments(filter),
    ]);

    return NextResponse.json({
      payments,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
