import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import { dbConnect } from "@/lib/mongoose";
import ServiceRequest from "@/models/ServiceRequest";
import "@/models/Repairshop";
import "@/models/User";
import "@/models/Conversation";

export async function GET(request: NextRequest) {
  try {
    const user = await resolveAuthenticatedUser(request, "car_owner");
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const requests = await ServiceRequest.find({ carOwnerId: user._id })
      .populate("assignedRepairshopId", "name location city phone email responseTimeMinutes")
      .populate("assignedRepairshopOwnerId", "name email phone")
      .populate("conversationId", "_id lastMessageAt lastMessagePreview status")
      .sort({ createdAt: -1 })
      .lean();

    const completedRequests = requests.filter((requestItem) => String(requestItem.status) === "completed").length;
    const assignedRequests = requests.filter((requestItem) => ["assigned", "in_progress", "completed"].includes(String(requestItem.status))).length;
    const activeRequests = requests.filter((requestItem) => ["open", "assigned", "in_progress"].includes(String(requestItem.status))).length;

    return NextResponse.json({
      stats: {
        totalRequests: requests.length,
        assignedRequests,
        activeRequests,
        completedRequests,
      },
      requests,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load service requests" }, { status: 500 });
  }
}
