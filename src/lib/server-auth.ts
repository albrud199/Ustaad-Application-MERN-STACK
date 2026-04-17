import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import type { UserRole } from "@/lib/auth";

type DecodedToken = { userId: string };

function decodeToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
  } catch {
    if (mongoose.Types.ObjectId.isValid(token)) {
      return { userId: token };
    }
    return null;
  }
}

export async function resolveAuthenticatedUser(request: NextRequest, requiredRole?: UserRole) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const decoded = decodeToken(authHeader.slice(7));
  if (!decoded?.userId) return null;

  await dbConnect();
  const user = await User.findById(decoded.userId);
  if (!user) return null;

  if (requiredRole && user.role !== requiredRole) return null;
  return user;
}
