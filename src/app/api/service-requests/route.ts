import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import ServiceRequest from "@/models/ServiceRequest";

export async function GET(request: NextRequest) {
  await dbConnect();
  const requests = await ServiceRequest.find().populate("userId");
  return NextResponse.json({ requests });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const serviceRequest = await ServiceRequest.create(body);
  return NextResponse.json({ message: "Service request created", serviceRequest });
}
