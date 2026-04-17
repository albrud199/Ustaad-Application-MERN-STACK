// scripts/seed.ts
/**
 * SEED SCRIPT - Populate MongoDB with sample data
 * Run with: npm run seed
 * This script creates sample users, parkings, bookings, and other data
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Import all models
import User from "../src/models/User";
import Parking from "../src/models/Parking";
import Booking from "../src/models/Booking";
import ServiceRequest from "../src/models/ServiceRequest";
import Payment from "../src/models/Payment";

// ===== CONFIGURATION =====
const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not defined in .env.local");
  process.exit(1);
}

// ===== HELPER FUNCTION: HASH PASSWORD =====
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

function createTransactionId(): string {
  return `TXN_${new mongoose.Types.ObjectId().toString()}`;
}

// ===== MAIN SEED FUNCTION =====
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // ===== CONNECT TO MONGODB =====
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // ===== CLEAR EXISTING DATA (Optional - Comment out to keep existing data) =====
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Parking.deleteMany({});
    await Booking.deleteMany({});
    await ServiceRequest.deleteMany({});
    await Payment.deleteMany({});
    console.log("✅ Cleared existing data\n");

    // ===== HASH PASSWORDS =====
    console.log("🔐 Hashing passwords...");
    const hashedPassword = await hashPassword("Password123!");
    const hashedAdminPassword = await hashPassword("AdminPassword123!");
    console.log("✅ Passwords hashed\n");

    // ===== CREATE ADMIN USER =====
    console.log("👤 Creating Admin User...");
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@ustaad.com",
      password: hashedAdminPassword,
      role: "admin",
      phone: "+923001111111",
      status: "active",
      nidStatus: "verified",
      emailVerified: true,
    });
    console.log(`✅ Admin created: ${adminUser.email}\n`);

    // ===== CREATE CAR OWNERS =====
    console.log("🚗 Creating Car Owners...");
    const carOwner1 = await User.create({
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      password: hashedPassword,
      role: "car_owner",
      phone: "+923001234567",
      status: "active",
      nidStatus: "verified",
      nidNumber: "12345-6789012-1",
      vehicles: [
        {
          licensePlate: "KHI-123",
          model: "Toyota Corolla",
          color: "Silver",
        },
      ],
      emailVerified: true,
    });
    console.log(`✅ Car Owner 1 created: ${carOwner1.email}`);

    const carOwner2 = await User.create({
      name: "Fatima Khan",
      email: "fatima@example.com",
      password: hashedPassword,
      role: "car_owner",
      phone: "+923009876543",
      status: "active",
      nidStatus: "verified",
      nidNumber: "98765-4321098-7",
      vehicles: [
        {
          licensePlate: "KHI-456",
          model: "Honda Civic",
          color: "Red",
        },
      ],
      emailVerified: true,
    });
    console.log(`✅ Car Owner 2 created: ${carOwner2.email}\n`);

    // ===== CREATE GARAGE OWNERS =====
    console.log("🏢 Creating Garage Owners...");
    const garageOwner1 = await User.create({
      name: "Smart Parking Solutions",
      email: "garage1@example.com",
      password: hashedPassword,
      role: "garage_owner",
      phone: "+923002222222",
      status: "active",
      emailVerified: true,
      garage: {
        name: "Downtown Parking Garage",
        location: "Main Street, Downtown",
        city: "Karachi",
        latitude: 24.8607,
        longitude: 67.0011,
        capacity: 150,
        availableSpots: 150,
        operatingHours: {
          open: "06:00",
          close: "22:00",
        },
        pricePerHour: 50,
        facilities: ["24/7 CCTV", "Covered Parking", "Security Guard", "EV Charging"],
      },
    });
    console.log(`✅ Garage Owner 1 created: ${garageOwner1.email}`);

    const garageOwner2 = await User.create({
      name: "Secure Parking Enterprises",
      email: "garage2@example.com",
      password: hashedPassword,
      role: "garage_owner",
      phone: "+923003333333",
      status: "active",
      emailVerified: true,
      garage: {
        name: "Gulshan Parking Complex",
        location: "Gulshan-e-Iqbal Block 14",
        city: "Karachi",
        latitude: 24.8607,
        longitude: 67.0011,
        capacity: 200,
        availableSpots: 200,
        operatingHours: {
          open: "24:00",
          close: "24:00",
        },
        pricePerHour: 40,
        facilities: ["24/7 Access", "Automated Gates", "Mobile App", "Monthly Plans"],
      },
    });
    console.log(`✅ Garage Owner 2 created: ${garageOwner2.email}\n`);

    // ===== CREATE PARKINGS =====
    console.log("🅿️  Creating Parkings...");
    const parking1 = await Parking.create({
      garageOwnerId: garageOwner1._id,
      name: "Downtown Parking Garage",
      description: "Premium covered parking in downtown area with 24/7 security",
      location: "Main Street, Downtown",
      city: "Karachi",
      latitude: 24.8607,
      longitude: 67.0011,
      totalSpots: 150,
      availableSpots: 145,
      pricePerHour: 50,
      pricePerDay: 400,
      pricePerMonth: 8000,
      operatingHours: {
        open: "06:00",
        close: "22:00",
      },
      facilities: ["CCTV", "Covered", "Guarded", "24/7"],
      status: "active",
    });
    console.log(`✅ Parking 1 created: ${parking1.name}`);

    const parking2 = await Parking.create({
      garageOwnerId: garageOwner2._id,
      name: "Gulshan Parking Complex",
      description: "Modern automated parking with real-time availability",
      location: "Gulshan-e-Iqbal Block 14",
      city: "Karachi",
      latitude: 24.8607,
      longitude: 67.0011,
      totalSpots: 200,
      availableSpots: 195,
      pricePerHour: 40,
      pricePerDay: 300,
      pricePerMonth: 6000,
      operatingHours: {
        open: "00:00",
        close: "23:59",
      },
      facilities: ["Automated", "App-Based", "Monthly Plans", "EV Charging"],
      status: "active",
    });
    console.log(`✅ Parking 2 created: ${parking2.name}\n`);

    // ===== CREATE BOOKINGS =====
    console.log("📅 Creating Bookings...");
    
    // Booking 1: Tomorrow 10 AM to 6 PM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    const tomorrowEvening = new Date(tomorrow);
    tomorrowEvening.setHours(18, 0, 0, 0);

    const booking1 = await Booking.create({
      carOwnerId: carOwner1._id,
      parkingId: parking1._id,
      startTime: tomorrow,
      endTime: tomorrowEvening,
      duration: 8,
      totalPrice: 400, // 8 hours * 50/hour
      vehicleDetails: {
        licensePlate: "KHI-123",
        model: "Toyota Corolla",
        color: "Silver",
      },
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "card",
    });
    console.log(`✅ Booking 1 created for ${carOwner1.name}`);

    // Booking 2: Day after tomorrow, full day
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    dayAfter.setHours(8, 0, 0, 0);
    const dayAfterEvening = new Date(dayAfter);
    dayAfterEvening.setHours(20, 0, 0, 0);

    const booking2 = await Booking.create({
      carOwnerId: carOwner2._id,
      parkingId: parking2._id,
      startTime: dayAfter,
      endTime: dayAfterEvening,
      duration: 12,
      totalPrice: 480, // 12 hours * 40/hour
      vehicleDetails: {
        licensePlate: "KHI-456",
        model: "Honda Civic",
        color: "Red",
      },
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "cash",
    });
    console.log(`✅ Booking 2 created for ${carOwner2.name}\n`);

    // ===== CREATE SERVICE REQUESTS =====
    console.log("🔧 Creating Service Requests...");
    const serviceRequest1 = await ServiceRequest.create({
      carOwnerId: carOwner1._id,
      serviceType: "repair",
      problemDescription: "Engine oil leak, making strange noises",
      carDetails: {
        licensePlate: "KHI-123",
        model: "Toyota Corolla",
        color: "Silver",
        year: 2020,
      },
      location: "Gulshan-e-Iqbal, Karachi",
      latitude: 24.8607,
      longitude: 67.0011,
      preferredDate: tomorrow,
      preferredTime: "10:00",
      status: "open",
    });
    console.log(`✅ Service Request 1 created for ${carOwner1.name}`);

    const serviceRequest2 = await ServiceRequest.create({
      carOwnerId: carOwner2._id,
      serviceType: "maintenance",
      problemDescription: "Regular maintenance - oil change and filter replacement",
      carDetails: {
        licensePlate: "KHI-456",
        model: "Honda Civic",
        color: "Red",
        year: 2021,
      },
      location: "Saddar, Karachi",
      latitude: 24.8045,
      longitude: 67.0382,
      preferredDate: dayAfter,
      preferredTime: "14:00",
      status: "open",
    });
    console.log(`✅ Service Request 2 created for ${carOwner2.name}\n`);

    // ===== CREATE PAYMENTS =====
    console.log("💳 Creating Payments...");
    const payment1 = await Payment.create({
      userId: carOwner1._id,
      referenceType: "booking",
      referenceId: booking1._id,
      amount: 400,
      currency: "PKR",
      paymentMethod: "card",
      status: "completed",
      transactionId: createTransactionId(),
      description: "Parking booking payment",
    });
    console.log(`✅ Payment 1 created: PKR ${payment1.amount}`);

    const payment2 = await Payment.create({
      userId: carOwner2._id,
      referenceType: "booking",
      referenceId: booking2._id,
      amount: 480,
      currency: "PKR",
      paymentMethod: "cash",
      status: "completed",
      transactionId: createTransactionId(),
      description: "Parking booking payment",
    });
    console.log(`✅ Payment 2 created: PKR ${payment2.amount}\n`);

    // ===== SUMMARY =====
    console.log("================================");
    console.log("✅ DATABASE SEEDING COMPLETE! ✅");
    console.log("================================\n");

    console.log("📊 CREATED:");
    console.log(`  👤 Users: 1 Admin + 2 Car Owners + 2 Garage Owners`);
    console.log(`  🅿️  Parkings: 2`);
    console.log(`  📅 Bookings: 2`);
    console.log(`  🔧 Service Requests: 2`);
    console.log(`  💳 Payments: 2\n`);

    console.log("🔑 TEST CREDENTIALS:");
    console.log(`  Admin: admin@ustaad.com / AdminPassword123!`);
    console.log(`  Car Owner 1: ahmed@example.com / Password123!`);
    console.log(`  Car Owner 2: fatima@example.com / Password123!`);
    console.log(`  Garage Owner 1: garage1@example.com / Password123!`);
    console.log(`  Garage Owner 2: garage2@example.com / Password123!\n`);

    console.log("🌐 TEST URLS:");
    console.log(`  Login: http://localhost:3000/login`);
    console.log(`  Home: http://localhost:3000`);
    console.log(`  API Test DB: http://localhost:3000/api/test-db\n`);

  } catch (error) {
    console.error("❌ SEEDING FAILED:", error);
    process.exit(1);
  } finally {
    // ===== DISCONNECT =====
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

// ===== RUN SEED =====
seedDatabase();