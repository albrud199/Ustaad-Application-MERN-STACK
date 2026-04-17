// src/app/api/test-db/route.ts
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: "Database connected successfully!",
      userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("DB test error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: String(error),
        message: "Failed to connect to database"
      },
      { status: 500 }
    );
  }
}