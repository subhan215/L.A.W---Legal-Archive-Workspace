import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploading file to Cloudinary
const upload_to_cloudinary = async (local_file_path, fileType) => {
  try {
    if (!local_file_path) {
      throw new Error("No file path provided");
    }

    // Determine resource type based on file type
    let resourceType = "auto";
    if (fileType.includes("pdf") || fileType.includes("msword") || fileType.includes("openxmlformats")) {
      resourceType = "raw"; // PDFs & DOCX should be stored as 'raw'
    }

    const response = await cloudinary.uploader.upload(local_file_path, {
      resource_type: resourceType,
      folder: "law_documents",
    });

    console.log(`✅ File uploaded to Cloudinary successfully: ${response.secure_url}`);
    
    // Remove file from local storage after successful upload
    fs.unlinkSync(local_file_path);

    return response;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);

    // Ensure the temporary file is removed, but check if it exists first
    if (fs.existsSync(local_file_path)) {
      fs.unlinkSync(local_file_path);
    }

    return null;
  }
};

export { upload_to_cloudinary };
