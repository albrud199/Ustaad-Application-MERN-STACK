import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Booking from "@/models/Booking";

export async function GET(request: NextRequest) {
  await dbConnect();
  const bookings = await Booking.find().populate(["userId", "parkingId"]);
  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const booking = await Booking.create(body);
  return NextResponse.json({ message: "Booking created", booking });
}
