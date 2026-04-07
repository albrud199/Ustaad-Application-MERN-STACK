import { NextRequest, NextResponse } from "next/server";
import { dbConnect, isMongoConfigured } from "@/lib/mongoose";
import ServiceRequest from "@/models/ServiceRequest";

// GET /api/admin/service-requests — List all service requests
export async function GET(request: NextRequest) {
  try {
    if (!isMongoConfigured()) {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);

      return NextResponse.json({
        serviceRequests: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
      });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const [serviceRequests, total] = await Promise.all([
      ServiceRequest.find(filter)
        .populate("userId", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ServiceRequest.countDocuments(filter),
    ]);

    return NextResponse.json({
      serviceRequests,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
