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
    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");
    const isPublic = formData.get("isPublic") === "true"; // Convert to boolean
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file temporarily
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    const buffer = await file.arrayBuffer();
    await writeFile(tempFilePath, Buffer.from(buffer));

    // Upload file to Cloudinary (pass MIME type)
    const uploadResponse = await upload_to_cloudinary(tempFilePath, file.type);

    if (!uploadResponse) {
      return NextResponse.json({ error: "Failed to upload to Cloudinary" }, { status: 500 });
    }

    // Save document details to MongoDB
    const newCollection = new Collection({
      title,
      category,
      description,
      visibility: isPublic ? "public" : "private",
      documents: [{ title: file.name, url: uploadResponse.secure_url, uploadDate: new Date() }],
    });

    await newCollection.save();

    return NextResponse.json({ message: "Document uploaded successfully!", url: uploadResponse.secure_url }, { status: 201 });
  } catch (error) {
    console.error("❌ Upload API Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
