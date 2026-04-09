import { NextResponse } from "next/server";
import { dbConnect, isMongoConfigured } from "@/lib/mongoose";
import User from "@/models/User";
import Booking from "@/models/Booking";
import Parking from "@/models/Parking";
import Payment from "@/models/Payment";
import ServiceRequest from "@/models/ServiceRequest";

// GET /api/admin/stats — Platform-wide KPIs
export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({
        totalUsers: 0,
        carOwners: 0,
        garageOwners: 0,
        activeUsers: 0,
        suspendedUsers: 0,
        pendingNid: 0,
        totalBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        totalParkings: 0,
        pendingParkings: 0,
        approvedParkings: 0,
        totalPayments: 0,
        totalRevenue: 0,
        openServiceRequests: 0,
        newUsersThisMonth: 0,
      });
    }

    await dbConnect();

    const [
      totalUsers,
      carOwners,
      garageOwners,
      activeUsers,
      suspendedUsers,
      pendingNid,
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalParkings,
      pendingParkings,
      approvedParkings,
      totalPayments,
      openServiceRequests,
    ] = await Promise.all([
      User.countDocuments({ role: { $ne: "admin" } }),
      User.countDocuments({ role: "car_owner" }),
      User.countDocuments({ role: "garage_owner" }),
      User.countDocuments({ role: { $ne: "admin" }, status: "active" }),
      User.countDocuments({ status: "suspended" }),
      User.countDocuments({ nidStatus: "pending", role: { $ne: "admin" } }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "cancelled" }),
      Parking.countDocuments(),
      Parking.countDocuments({ status: "pending" }),
      Parking.countDocuments({ status: "approved" }),
      Payment.countDocuments(),
      ServiceRequest.countDocuments({ status: "open" }),
    ]);

    // Revenue calculation
    const revenueResult = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Recent users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsersThisMonth = await User.countDocuments({
      role: { $ne: "admin" },
      createdAt: { $gte: thirtyDaysAgo },
    });

    return NextResponse.json({
      totalUsers,
      carOwners,
      garageOwners,
      activeUsers,
      suspendedUsers,
      pendingNid,
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalParkings,
      pendingParkings,
      approvedParkings,
      totalPayments,
      totalRevenue,
      openServiceRequests,
      newUsersThisMonth,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
