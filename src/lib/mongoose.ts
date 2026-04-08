import mongoose from "mongoose";

type MongooseCache = {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string | undefined;

const cached = (globalThis.__mongooseCache ??= { conn: null, promise: null });

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance);
  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;
  return cached.conn;
}

export function isMongoConfigured() {
  return Boolean(MONGODB_URI);
}

export const dbStatus = {
  message: "DB connection OK",
  count: 0,
  latestUser: null,
};
