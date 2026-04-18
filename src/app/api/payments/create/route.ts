// src/app/api/payments/create/route.ts
import { dbConnect } from "@/lib/mongoose";
import Payment from "@/models/Payment";
import Booking from "@/models/Booking";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return null;
  }
}

/**
 * POST /api/payments/create
 * Process payment for a booking and update payment history
 */
export async function POST(request: NextRequest) {
  try {
    // ===== VERIFY TOKEN =====
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token) as any;
    
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    await dbConnect();

    // ===== GET REQUEST BODY =====
    const body = await request.json();
    const {
      bookingId,
      amount,
      paymentMethod,
      transactionId,
    } = body;

    // ===== VALIDATE REQUIRED FIELDS =====
    if (!bookingId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId, amount, paymentMethod" },
        { status: 400 }
      );
    }

    // ===== VERIFY PAYMENT METHOD =====
    const validMethods = ["card", "bank_transfer", "cash", "wallet"];
    if (!validMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }

    // ===== GET BOOKING =====
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // ===== VERIFY AMOUNT MATCHES =====
    if (Math.abs(amount - booking.totalPrice) > 0.01) {
      return NextResponse.json(
        { error: "Payment amount does not match booking total" },
        { status: 400 }
      );
    }

    // ===== VERIFY USER IS THE BOOKING OWNER =====
    if (booking.carOwnerId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: "Unauthorized: This booking does not belong to you" },
        { status: 403 }
      );
    }

    // ===== CHECK IF ALREADY PAID =====
    if (booking.paymentStatus === "paid") {
      return NextResponse.json(
        { error: "This booking has already been paid" },
        { status: 400 }
      );
    }

    // ===== GENERATE TRANSACTION ID =====
    const finalTransactionId = transactionId || `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // ===== CREATE PAYMENT RECORD =====
    const payment = new Payment({
      userId: decoded.userId,
      referenceType: "booking",
      referenceId: bookingId,
      amount,
      currency: "BDT",
      paymentMethod,
      status: "completed",
      transactionId: finalTransactionId,
      description: `Parking booking payment for ${booking.duration} hours`,
      metadata: {
        parkingId: booking.parkingId,
        startTime: booking.startTime,
        endTime: booking.endTime,
      },
    });

    await payment.save();

    // ===== UPDATE BOOKING WITH PAYMENT INFO =====
    booking.paymentStatus = "paid";
    booking.paymentMethod = paymentMethod;
    booking.transactionId = finalTransactionId;
    booking.status = "confirmed";
    await booking.save();

    // ===== UPDATE USER'S PAYMENT HISTORY (if using embedded array) =====
    await User.findByIdAndUpdate(
      decoded.userId,
      {
        $push: {
          paymentHistory: {
            bookingId: booking._id,
            amount,
            paymentMethod,
            transactionId: finalTransactionId,
            date: new Date(),
            status: "completed",
          },
        },
      },
      { new: true }
    );

    // ===== RETURN SUCCESS =====
    return NextResponse.json(
      {
        message: "✅ Payment processed successfully",
        payment: {
          _id: payment._id,
          transactionId: finalTransactionId,
          amount,
          status: "completed",
        },
        booking: {
          _id: booking._id,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ Payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
