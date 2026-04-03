import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Payment from "@/models/Payment";

export async function GET(request: NextRequest) {
  await dbConnect();
  const payments = await Payment.find().populate(["userId", "bookingId"]);
  return NextResponse.json({ payments });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const payment = await Payment.create(body);
  return NextResponse.json({ message: "Payment created", payment });
}
