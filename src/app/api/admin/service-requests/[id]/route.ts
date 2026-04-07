import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import ServiceRequest from "@/models/ServiceRequest";

// PUT /api/admin/service-requests/[id] — Update service request
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const allowedFields = ["status"];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const serviceRequest = await ServiceRequest.findByIdAndUpdate(id, updates, { new: true })
      .populate("userId", "name email")
      .lean();

    if (!serviceRequest) {
      return NextResponse.json({ error: "Service request not found" }, { status: 404 });
    }

    return NextResponse.json({ serviceRequest });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
