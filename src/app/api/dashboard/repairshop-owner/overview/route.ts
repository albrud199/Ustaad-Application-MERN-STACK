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
    .sort({ createdAt: -1 })
    .lean();

  const completedRequests = requests.filter((requestItem) => requestItem.status === "completed");
  const activeRequests = requests.filter((requestItem) => ["open", "assigned", "in_progress"].includes(String(requestItem.status))).length;
  const emergencyRequests = requests.filter((requestItem) => requestItem.serviceMode === "emergency").length;

  const totalRevenue = completedRequests.reduce(
    (sum, requestItem) => sum + Number(requestItem.actualCost || requestItem.estimatedCost || 0),
    0
  );

  return NextResponse.json({
    repairshop,
    stats: {
      totalRequests: requests.length,
      activeRequests,
      completedRequests: completedRequests.length,
      emergencyRequests,
      totalRevenue,
    },
    requests,
    history: completedRequests.slice(0, 10),
  });
}