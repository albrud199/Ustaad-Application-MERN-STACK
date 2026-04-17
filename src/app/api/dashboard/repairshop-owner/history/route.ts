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

  const { searchParams } = new URL(request.url);
  const carOwnerId = searchParams.get("carOwnerId");
  const licensePlate = searchParams.get("licensePlate");

  const filter: Record<string, unknown> = {
    assignedRepairshopId: repairshop._id,
    status: { $in: ["completed", "cancelled"] },
  };

  if (carOwnerId) {
    filter.carOwnerId = carOwnerId;
  }

  if (licensePlate) {
    filter["carDetails.licensePlate"] = licensePlate;
  }

  const history = await ServiceRequest.find(filter)
    .populate("carOwnerId", "name email phone")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ repairshop, history });
}