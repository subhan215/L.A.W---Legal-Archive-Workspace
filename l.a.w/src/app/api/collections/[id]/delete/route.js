import connectDB from "@/app/database";
import Collection from "../../../../models/collection.model";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Extract ID from the URL
    console.log("Deleting collection with ID:", id);

    await connectDB();
    const deletedCollection = await Collection.findByIdAndDelete(id);

    if (!deletedCollection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Collection deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
  }
}
