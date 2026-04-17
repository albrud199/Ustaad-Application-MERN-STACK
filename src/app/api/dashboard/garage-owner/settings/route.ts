import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

type Decoded = { userId: string };

function decodeToken(token: string): Decoded | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Decoded;
    return decoded;
  } catch {
    if (mongoose.Types.ObjectId.isValid(token)) {
      return { userId: token };
    }
    return null;
  }
}

async function resolveGarageOwner(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const decoded = decodeToken(token);
  if (!decoded?.userId) return null;

  await dbConnect();
  const user = await User.findById(decoded.userId);
  if (!user || user.role !== "garage_owner") return null;
  return user;
}

export async function GET(request: NextRequest) {
  try {
    const user = await resolveGarageOwner(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      settings: {
        garageName: user.garage?.name || "",
        location: user.garage?.location || "",
        capacity: user.garage?.capacity || 0,
        openingHour: user.garage?.operatingHours?.open || "08:00",
        closingHour: user.garage?.operatingHours?.close || "20:00",
        phone: user.phone || "",
        email: user.email || "",
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await resolveGarageOwner(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      garageName,
      location,
      capacity,
      openingHour,
      closingHour,
      phone,
      email,
    } = body;

    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.garage = {
      ...(user.garage || {}),
      name: garageName || "",
      location: location || "",
      capacity: Number(capacity) || 0,
      operatingHours: {
        open: openingHour || "08:00",
        close: closingHour || "20:00",
      },
    };

    await user.save();

    return NextResponse.json({ message: "Settings saved successfully" });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
