import { NextResponse } from "next/server";
import connectDB from "../../../database/index.js";
import Collection from "../../../models/collection.model.js";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const collection = await Collection.findById(params.id);
    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 });
  }
}
