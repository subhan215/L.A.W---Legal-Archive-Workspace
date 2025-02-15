import { NextResponse } from "next/server";
import { upload_to_cloundiary } from "../../cloud/cloudinary.js";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); // Get uploaded file

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file temporarily
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    const buffer = await file.arrayBuffer();
    await writeFile(tempFilePath, Buffer.from(buffer));

    // Upload to Cloudinary (pass MIME type)
    const response = await upload_to_cloundiary(tempFilePath, file.type);

    if (!response) {
      return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: response.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
