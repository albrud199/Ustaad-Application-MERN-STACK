import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Subscription from "@/models/Subscription";

export async function GET(request: NextRequest) {
  await dbConnect();
  const subscriptions = await Subscription.find().populate("userId");
  return NextResponse.json({ subscriptions });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const subscription = await Subscription.create(body);
  return NextResponse.json({ message: "Subscription created", subscription });
}
