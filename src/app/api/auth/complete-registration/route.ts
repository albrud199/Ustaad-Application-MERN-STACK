import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import Repairshop from "@/models/Repairshop";

type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "car_owner" | "garage_owner" | "repairshop_owner";
  nidNumber: string;
};

function fileToDataUrl(file: File): Promise<string> {
  return file.arrayBuffer().then((buffer) => {
    const base64 = Buffer.from(buffer).toString("base64");
    return `data:${file.type};base64,${base64}`;
  });
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const userDataRaw = formData.get("userData");
    const nidFront = formData.get("nidFront");
    const nidBack = formData.get("nidBack");
    const selfie = formData.get("selfie");
    const profilePicture = formData.get("profilePicture");

    if (
      typeof userDataRaw !== "string" ||
      !(nidFront instanceof File) ||
      !(nidBack instanceof File) ||
      !(selfie instanceof File) ||
      !(profilePicture instanceof File)
    ) {
      return NextResponse.json({ error: "Missing required registration files or user data." }, { status: 400 });
    }

    const userData = JSON.parse(userDataRaw) as RegistrationData;

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.phone ||
      !userData.role ||
      !userData.nidNumber
    ) {
      return NextResponse.json({ error: "Incomplete registration details." }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 409 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (nidFront.size > maxSize || nidBack.size > maxSize || selfie.size > maxSize || profilePicture.size > maxSize) {
      return NextResponse.json({ error: "Each image must be 5MB or smaller." }, { status: 400 });
    }

    const [frontImage, backImage, selfieImage, profileImage] = await Promise.all([
      fileToDataUrl(nidFront),
      fileToDataUrl(nidBack),
      fileToDataUrl(selfie),
      fileToDataUrl(profilePicture),
    ]);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createdUser = await User.create({
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      role: userData.role,
      phone: userData.phone,
      status: "active",
      nidStatus: "pending",
      nidNumber: userData.nidNumber,
      nidSubmittedAt: new Date(),
      profilePicture: profileImage,
      nidDocuments: {
        frontImage,
        backImage,
        selfieImage,
      },
    });

    if (userData.role === "repairshop_owner") {
      await Repairshop.create({
        ownerId: createdUser._id,
        name: `${createdUser.name} Repair Shop`,
        location: "",
        city: "",
        latitude: 0,
        longitude: 0,
        services: ["general", "emergency", "repair", "maintenance"],
        emergencyAvailable: true,
        status: "active",
        responseTimeMinutes: 30,
        phone: createdUser.phone || "",
        email: createdUser.email,
        operatingHours: {
          open: "08:00",
          close: "20:00",
        },
      });
    }

    const user = {
      id: String(createdUser._id),
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    };

    const token = jwt.sign(
      {
        userId: String(createdUser._id),
        email: createdUser.email,
        role: createdUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    return NextResponse.json(
      {
        message: "Registration and NID submission completed.",
        user,
        token,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
