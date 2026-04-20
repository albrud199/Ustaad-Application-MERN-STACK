import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ vehicles: user.vehicles || [] });
}

export async function POST(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const vehicle = {
    vehicleId: new mongoose.Types.ObjectId(),
    licensePlate: String(body.licensePlate || "").trim(),
    model: String(body.model || "").trim(),
    color: String(body.color || "").trim(),
    registrationNumber: String(body.registrationNumber || "").trim(),
    year: body.year ? Number(body.year) : undefined,
  };

  if (!vehicle.licensePlate || !vehicle.model) {
    return NextResponse.json({ error: "License plate and model are required" }, { status: 400 });
  }

  const existingVehicles = ((user as any).vehicles || []) as Array<Record<string, unknown>>;
  (user as any).vehicles = [...existingVehicles, vehicle];
  await user.save();

  return NextResponse.json({ message: "Vehicle added successfully", vehicles: (user as any).vehicles });
}

export async function DELETE(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const vehicleId = searchParams.get("vehicleId");
  if (!vehicleId) {
    return NextResponse.json({ error: "Missing vehicleId" }, { status: 400 });
  }

  const currentVehicles = ((user as any).vehicles || []) as Array<{ vehicleId?: mongoose.Types.ObjectId }>;
  (user as any).vehicles = currentVehicles.filter((vehicle) => String(vehicle.vehicleId) !== vehicleId);
  await user.save();

  return NextResponse.json({ message: "Vehicle removed successfully", vehicles: (user as any).vehicles });
}
