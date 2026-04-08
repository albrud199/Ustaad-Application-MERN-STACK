import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  await dbConnect();

  const count = await User.countDocuments();
  const latestUser = await User.findOne().sort({ createdAt: -1 });

  return NextResponse.json({ message: "DB connection OK", count, latestUser });
}

export async function POST(request: NextRequest) {
  await dbConnect();

  const body = await request.json();
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "name and email are required" }, { status: 400 });
  }

  const user = await User.create({
    name: body.name,
    email: body.email,
    role: body.role || "user",
  });

  return NextResponse.json({ message: "User created", user });
}
