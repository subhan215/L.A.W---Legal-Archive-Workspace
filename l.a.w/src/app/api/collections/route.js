import { NextResponse } from "next/server";
import connectDB from "../../database/index.js";
import Collection from "../../models/collection.model.js";

export async function GET() {
  try {
    await connectDB();
    const collections = await Collection.find({});
    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}
