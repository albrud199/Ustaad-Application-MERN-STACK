import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import { dbConnect } from "@/lib/mongoose";
import Repairshop from "@/models/Repairshop";
import ServiceRequest from "@/models/ServiceRequest";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "repairshop_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const repairshop = await Repairshop.findOne({ ownerId: user._id }).lean();
  if (!repairshop) {
    return NextResponse.json({ error: "Repair shop profile not found" }, { status: 404 });
  }

  const requests = await ServiceRequest.find({ assignedRepairshopId: repairshop._id })
    .populate("carOwnerId", "name email phone")
    .populate("conversationId")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ repairshop, requests });
}

export async function PUT(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "repairshop_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const repairshop = await Repairshop.findOne({ ownerId: user._id }).lean();
  if (!repairshop) {
    return NextResponse.json({ error: "Repair shop profile not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    requestId?: string;
    status?: string;
    actualCost?: number;
    estimatedCost?: number;
    notes?: string;
  };

  if (!body.requestId) {
    return NextResponse.json({ error: "Missing requestId" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (body.status) updates.status = body.status;
  if (body.actualCost !== undefined) updates.actualCost = Number(body.actualCost);
  if (body.estimatedCost !== undefined) updates.estimatedCost = Number(body.estimatedCost);
  if (body.notes !== undefined) updates.notes = body.notes;
  if (body.status === "assigned" || body.status === "in_progress") updates.assignedAt = new Date();

  const updated = await ServiceRequest.findOneAndUpdate(
    { _id: body.requestId, assignedRepairshopId: repairshop._id },
    updates,
    { new: true }
  )
    .populate("carOwnerId", "name email phone")
    .lean();

  if (!updated) {
    return NextResponse.json({ error: "Service request not found" }, { status: 404 });
  }

  return NextResponse.json({ request: updated });
}