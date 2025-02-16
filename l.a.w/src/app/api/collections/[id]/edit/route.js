import connectDB from "@/app/database";
import Collection from "../../../../models/collection.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { id, title, description } = await req.json();
    console.log("id: " , id)
    await connectDB();
    const updatedCollection = await Collection.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedCollection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCollection, { status: 200 });
  } catch (error) {
    console.error("Error updating collection:", error);
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
  }
}