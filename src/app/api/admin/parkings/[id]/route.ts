import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Parking from "@/models/Parking";

// PUT /api/admin/parkings/[id] — Update parking listing
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const allowedFields = ["status", "title", "location", "pricePerHour", "totalSlots", "availableSlots"];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const parking = await Parking.findByIdAndUpdate(id, updates, { new: true })
      .populate("ownerId", "name email")
      .lean();

    if (!parking) {
      return NextResponse.json({ error: "Parking not found" }, { status: 404 });
    }

    return NextResponse.json({ parking });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

// DELETE /api/admin/parkings/[id] — Delete parking listing
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const parking = await Parking.findByIdAndDelete(id);
    if (!parking) {
      return NextResponse.json({ error: "Parking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Parking deleted successfully" });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
