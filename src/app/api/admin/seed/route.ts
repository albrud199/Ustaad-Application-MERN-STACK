import { NextResponse } from "next/server";
import { dbConnect, isMongoConfigured } from "@/lib/mongoose";
import User from "@/models/User";

// POST /api/admin/seed — Creates default admin account
export async function POST() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json(
        {
          message: "MongoDB is not configured. Dev admin login is available with admin@ustaad.io / admin123.",
          admin: { email: "admin@ustaad.io", role: "admin" },
        },
        { status: 200 }
      );
    }

    await dbConnect();

    const existing = await User.findOne({ email: "admin@ustaad.io" });
    if (existing) {
      return NextResponse.json(
        { message: "Admin account already exists", admin: { email: existing.email, role: existing.role } },
        { status: 200 }
      );
    }

    const admin = await User.create({
      name: "Ustaad Admin",
      email: "admin@ustaad.io",
      password: "admin123",
      role: "admin",
      status: "active",
      nidStatus: "verified",
      phone: "+8801700000000",
    });

    return NextResponse.json(
      { message: "Admin account created successfully", admin: { email: admin.email, role: admin.role } },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
