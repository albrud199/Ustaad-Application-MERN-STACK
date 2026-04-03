import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Notification from "@/models/Notification";

export async function GET(request: NextRequest) {
  await dbConnect();
  const notifications = await Notification.find().populate("userId");
  return NextResponse.json({ notifications });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const notification = await Notification.create(body);
  return NextResponse.json({ message: "Notification created", notification });
}
