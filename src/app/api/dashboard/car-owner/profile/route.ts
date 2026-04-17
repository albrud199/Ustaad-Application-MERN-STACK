import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import User from "@/models/User";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
    },
  });
}

export async function PUT(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
    phone?: string;
  };

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  if (email !== user.email) {
    const existing = await User.findOne({ email }).select("_id").lean();
    if (existing) {
      return NextResponse.json({ error: "Email is already in use" }, { status: 409 });
    }
  }

  user.name = name;
  user.email = email;
  user.phone = phone;
  await user.save();

  return NextResponse.json({
    message: "Profile updated successfully",
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
    },
  });
}
