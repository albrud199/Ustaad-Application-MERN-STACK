import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import ServiceQuote from "@/models/ServiceQuote";

export async function GET(request: NextRequest) {
  await dbConnect();
  const quotes = await ServiceQuote.find().populate(["requestId", "garageId"]);
  return NextResponse.json({ quotes });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const quote = await ServiceQuote.create(body);
  return NextResponse.json({ message: "Service quote created", quote });
}
