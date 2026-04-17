import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import { dbConnect } from "@/lib/mongoose";
import Repairshop from "@/models/Repairshop";

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

  return NextResponse.json({
    settings: {
      name: repairshop.name || "",
      location: repairshop.location || "",
      city: repairshop.city || "",
      latitude: repairshop.latitude || 0,
      longitude: repairshop.longitude || 0,
      services: repairshop.services || [],
      emergencyAvailable: Boolean(repairshop.emergencyAvailable),
      responseTimeMinutes: repairshop.responseTimeMinutes || 30,
      phone: repairshop.phone || "",
      email: repairshop.email || "",
      openingHour: repairshop.operatingHours?.open || "08:00",
      closingHour: repairshop.operatingHours?.close || "20:00",
      description: repairshop.description || "",
    },
  });
}

export async function PUT(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "repairshop_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const repairshop = await Repairshop.findOne({ ownerId: user._id });
  if (!repairshop) {
    return NextResponse.json({ error: "Repair shop profile not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    location?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    services?: string[];
    emergencyAvailable?: boolean;
    responseTimeMinutes?: number;
    phone?: string;
    email?: string;
    openingHour?: string;
    closingHour?: string;
    description?: string;
  };

  repairshop.name = body.name || repairshop.name;
  repairshop.location = body.location ?? repairshop.location;
  repairshop.city = body.city ?? repairshop.city;
  repairshop.latitude = Number(body.latitude ?? repairshop.latitude ?? 0);
  repairshop.longitude = Number(body.longitude ?? repairshop.longitude ?? 0);
  repairshop.services = Array.isArray(body.services) ? body.services : repairshop.services;
  repairshop.emergencyAvailable = body.emergencyAvailable ?? repairshop.emergencyAvailable;
  repairshop.responseTimeMinutes = Number(body.responseTimeMinutes ?? repairshop.responseTimeMinutes ?? 30);
  repairshop.phone = body.phone ?? repairshop.phone;
  repairshop.email = body.email ?? repairshop.email;
  repairshop.operatingHours = {
    open: body.openingHour || repairshop.operatingHours?.open || "08:00",
    close: body.closingHour || repairshop.operatingHours?.close || "20:00",
  };
  repairshop.description = body.description ?? repairshop.description;

  await repairshop.save();

  return NextResponse.json({ message: "Settings saved successfully" });
}