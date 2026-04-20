import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect, isMongoConfigured } from "@/lib/mongoose";
import User from "@/models/User";

// GET /api/admin/users — List users with filters
export async function GET(request: NextRequest) {
  try {
    if (!isMongoConfigured()) {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);

      return NextResponse.json({
        users: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role"); // car_owner | garage_owner
    const status = searchParams.get("status"); // active | suspended | banned
    const nidStatus = searchParams.get("nidStatus"); // pending | verified | rejected
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Build filter
    const filter: Record<string, unknown> = { role: { $ne: "admin" } };
    if (role) filter.role = role;
    if (status) filter.status = status;
    if (nidStatus) filter.nidStatus = nidStatus;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

// POST /api/admin/users — Create a new user
export async function POST(request: NextRequest) {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json(
        { error: "MongoDB is not configured for admin user creation." },
        { status: 503 }
      );
    }

    await dbConnect();
    const body = await request.json();

    const { name, email, password, role, phone } = body;
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "name, email, password, and role are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      phone: phone || "",
      status: "active",
      nidStatus: "pending",
    });

    const { password: _password, ...userObj } = user.toObject();

    return NextResponse.json({ user: userObj }, { status: 201 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
