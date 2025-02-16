import { NextResponse } from "next/server";
import { upload_to_cloudinary } from "../../cloud/cloudinary";
import connectDB from "../../database/index.js";
import Collection from "../../models/collection.model";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const collectionId = formData.get("collectionId");
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file temporarily
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    const buffer = await file.arrayBuffer();
    await writeFile(tempFilePath, Buffer.from(buffer));

    // Upload file to Cloudinary
    const uploadResponse = await upload_to_cloudinary(tempFilePath, file.type);
    if (!uploadResponse) {
      return NextResponse.json({ error: "Failed to upload to Cloudinary" }, { status: 500 });
    }

    const newDocument = {
      title: file.name,
      fileUrl: uploadResponse.secure_url,
      uploadDate: new Date(),
    };

    if (collectionId) {
      // Find the existing collection and append the document
      const existingCollection = await Collection.findById(collectionId);
      if (!existingCollection) {
        return NextResponse.json({ error: "Collection not found" }, { status: 404 });
      }

      existingCollection.documents.push(newDocument);
      await existingCollection.save();

      return NextResponse.json({
        message: "Document added to existing collection successfully!",
        url: uploadResponse.secure_url,
      }, { status: 200 });
    } else {
      // Create a new collection
      const title = formData.get("title");
      const category = formData.get("category");
      const description = formData.get("description");
      const userId = formData.get("userId");
      const isPublic = formData.get("isPublic") === "true"; // Convert to boolean

      const newCollection = new Collection({
        userId,
        title,
        category,
        description,
        visibility: isPublic ? "public" : "private",
        documents: [newDocument],
      });

      await newCollection.save();
      return NextResponse.json({
        message: "New collection created and document uploaded successfully!",
        url: uploadResponse.secure_url,
      }, { status: 201 });
    }
  } catch (error) {
    console.error("❌ Upload API Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
