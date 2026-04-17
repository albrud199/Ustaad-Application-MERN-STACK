import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import { dbConnect } from "@/lib/mongoose";
import Conversation from "@/models/Conversation";
import ServiceRequest from "@/models/ServiceRequest";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const conversations = await Conversation.find({ participants: user._id })
    .populate("serviceRequestId")
    .sort({ lastMessageAt: -1 })
    .lean();

  return NextResponse.json({ conversations });
}

export async function POST(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = (await request.json().catch(() => ({}))) as { serviceRequestId?: string };
  if (!body.serviceRequestId) {
    return NextResponse.json({ error: "Missing serviceRequestId" }, { status: 400 });
  }

  const serviceRequest = await ServiceRequest.findById(body.serviceRequestId).lean();
  if (!serviceRequest) {
    return NextResponse.json({ error: "Service request not found" }, { status: 404 });
  }

  const existing = await Conversation.findOne({ serviceRequestId: serviceRequest._id }).lean();
  if (existing) {
    return NextResponse.json({ conversation: existing });
  }

  const participants = [serviceRequest.carOwnerId, serviceRequest.assignedRepairshopOwnerId || serviceRequest.assignedGarageId].filter(Boolean);
  const conversation = await Conversation.create({
    serviceRequestId: serviceRequest._id,
    participants,
    status: "active",
    lastMessageAt: new Date(),
    lastMessagePreview: "Conversation started.",
  });

  return NextResponse.json({ conversation }, { status: 201 });
}