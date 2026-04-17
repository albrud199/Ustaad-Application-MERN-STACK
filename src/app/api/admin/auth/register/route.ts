// src/app/api/auth/register/route.ts
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const body = await request.json();
    const { name, email, password, role, phone } = body;

    // ===== VALIDATION =====
    // Check all required fields are present
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["name", "email", "password", "role"]
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ["car_owner", "garage_owner"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'car_owner' or 'garage_owner'" },
        { status: 400 }
      );
    }

    // ===== CHECK IF USER EXISTS =====
    const existingUser = await User.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // ===== HASH PASSWORD =====
    const hashedPassword = await bcrypt.hash(password, 10);

    // ===== CREATE USER =====
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      phone: phone || null,
      status: "active",
    });

    await newUser.save();

    // ===== RETURN RESPONSE =====
    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return NextResponse.json(
      { 
        message: "✅ User registered successfully",
        user: userResponse
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ Register error:", error);
    return NextResponse.json(
      { 
        error: "Registration failed",
        details: error.message 
      },
      { status: 500 }
    );
  }
}