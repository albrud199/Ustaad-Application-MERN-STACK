// src/app/api/auth/me/route.ts
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Helper function to verify JWT token
function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET as string
    );
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // ===== GET TOKEN FROM HEADER =====
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.slice(7);

    // ===== VERIFY TOKEN =====
    const decoded = verifyToken(token) as any;
    
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ===== GET USER FROM DATABASE =====
    await dbConnect();
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ===== RETURN USER =====
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(userResponse);

  } catch (error: any) {
    console.error("❌ Get user error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}