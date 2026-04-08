import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Parking from "@/models/Parking";

export async function GET(request: NextRequest) {
  await dbConnect();
  const parkings = await Parking.find().populate("ownerId");
  return NextResponse.json({ parkings });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const parking = await Parking.create(body);
  return NextResponse.json({ message: "Parking created", parking });
}
