"use client";

import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/checkcloud", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.url) {
      setUploadedUrl(data.url);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input 
        type="file" 
        accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => setFile(e.target.files[0])} 
      />
      <button onClick={handleUpload}>Upload</button>
      {uploadedUrl && (
        <p>Uploaded File: <a href={uploadedUrl} target="_blank">View</a></p>
      )}
    </div>
  );
}
