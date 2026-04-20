import { NextResponse } from "next/server";
import { dbConnect, isMongoConfigured } from "@/lib/mongoose";
import Parking from "@/models/Parking";
import Repairshop from "@/models/Repairshop";
import User from "@/models/User";

export type MapLocationItem = {
  id: string;
  type: "parking" | "garage" | "repairshop";
  name: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  detailsUrl: string;
  bookingUrl?: string;
};

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ locations: [] });
    }

    await dbConnect();

    const [parkings, garages, repairshops] = await Promise.all([
      Parking.find({ status: "active" })
        .select("name location city latitude longitude pricePerHour")
        .lean(),
      User.find({ role: "garage_owner", status: "active" })
        .select("name garage")
        .lean(),
      Repairshop.find({ status: "active" })
        .select("name location city latitude longitude")
        .lean(),
    ]);

    const parkingLocations: MapLocationItem[] = parkings
      .filter((item: any) => Number(item.latitude) && Number(item.longitude))
      .map((item: any) => {
        const price = Number(item.pricePerHour || 0);
        const detailsUrl = `/parking-details?parkingId=${encodeURIComponent(String(item._id))}`;
        const bookingUrl = `/checkout?parkingId=${encodeURIComponent(String(item._id))}&parkingName=${encodeURIComponent(item.name || "Parking")}&location=${encodeURIComponent(`${item.location || "Unknown"}, ${item.city || "Dhaka"}`)}&rate=${price}&date=${new Date().toISOString().slice(0, 10)}&start=14:00&end=18:00&currency=BDT`;

        return {
          id: String(item._id),
          type: "parking",
          name: item.name || "Parking",
          location: item.location || "",
          city: item.city || "",
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
          detailsUrl,
          bookingUrl,
        };
      });

    const garageLocations: MapLocationItem[] = garages
      .filter((item: any) => Number(item?.garage?.latitude) && Number(item?.garage?.longitude))
      .map((item: any) => ({
        id: String(item._id),
        type: "garage",
        name: item.garage?.name || `${item.name || "Garage Owner"} Garage`,
        location: item.garage?.location || "",
        city: item.garage?.city || "",
        latitude: Number(item.garage?.latitude),
        longitude: Number(item.garage?.longitude),
        detailsUrl: `/garage-details?ownerId=${encodeURIComponent(String(item._id))}`,
      }));

    const repairshopLocations: MapLocationItem[] = repairshops
      .filter((item: any) => Number(item.latitude) && Number(item.longitude))
      .map((item: any) => ({
        id: String(item._id),
        type: "repairshop",
        name: item.name || "Repair Shop",
        location: item.location || "",
        city: item.city || "",
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        detailsUrl: `/request-service?repairshopId=${encodeURIComponent(String(item._id))}`,
      }));

    return NextResponse.json({
      locations: [...parkingLocations, ...garageLocations, ...repairshopLocations],
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
