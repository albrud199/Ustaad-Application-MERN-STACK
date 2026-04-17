import { NextResponse } from "next/server";
import { dbConnect, isMongoConfigured } from "@/lib/mongoose";
import Repairshop from "@/models/Repairshop";

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ serviceCenters: [] });
    }

    await dbConnect();

    const serviceCenters = await Repairshop.find({ status: "active" })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ serviceCenters });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
