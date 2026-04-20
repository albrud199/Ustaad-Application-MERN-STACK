// src/app/api/auth/login/route.ts
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const body = await request.json();
    const { email, password } = body;

    // ===== VALIDATION =====
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ===== FIND USER =====
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ===== COMPARE PASSWORDS =====
    const storedPassword = String(user.password || "");
    const isHashedPassword = /^\$2[aby]\$\d{2}\$/.test(storedPassword);

    let isPasswordValid = false;

    if (isHashedPassword) {
      isPasswordValid = await bcrypt.compare(password, storedPassword);
    } else {
      // Backward compatibility for legacy plain-text records.
      isPasswordValid = password === storedPassword;
      if (isPasswordValid) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ===== CHECK ACCOUNT STATUS =====
    if (user.status === "suspended") {
      return NextResponse.json(
        { error: "Your account has been suspended" },
        { status: 403 }
      );
    }

    if (user.status === "banned") {
      return NextResponse.json(
        { error: "Your account has been banned" },
        { status: 403 }
      );
    }

    // ===== GENERATE JWT TOKEN =====
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        email: user.email 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    // ===== RETURN RESPONSE =====
    const { password: _password, ...userResponse } = user.toObject();

    return NextResponse.json({
      message: "✅ Login successful",
      user: userResponse,
      token: token,
    });

  } catch (error: any) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { 
        error: "Login failed",
        details: error.message 
      },
      { status: 500 }
    );
  }
}