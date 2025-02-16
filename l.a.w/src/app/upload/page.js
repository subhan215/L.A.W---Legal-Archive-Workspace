"use client";

import { useState, useEffect, useRef } from "react";
import Button from "../../components/ui/CustomButton";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import Textarea from "../../components/ui/text_area";
import { Switch } from "@/components/ui/switch";
import { DashboardHeader } from "../../components/ui/dashboard_headers";
import { Upload } from "lucide-react";
import CustomSelect from "@/components/ui/select";

export default function UploadPage() {
  const [isPublic, setIsPublic] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [userId, setUserId] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("category", formData.category);
    uploadData.append("description", formData.description);
    uploadData.append("isPublic", isPublic);
    uploadData.append("file", file);
    uploadData.append("userId", userId);

    console.log("userId: ", userId);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      alert("Upload successful!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
  <DashboardHeader />
  <main className="container mx-auto p-6 flex flex-col items-center">
    <div className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Document</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Case Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Case Title</Label>
          <Input
            id="title"
            placeholder="Enter case title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Legal Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Legal Category</Label>
          <CustomSelect
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            options={[
              { value: "Criminal", label: "Criminal Law" },
              { value: "Civil", label: "Civil Law" },
              { value: "Corporate", label: "Corporate Law" },
            ]}
            placeholder="Select category"
          />
        </div>

        {/* Case Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Case Description</Label>
          <Textarea
            id="description"
            placeholder="Enter a brief description of the case"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="file">Upload Document</Label>
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your file here, or click to select
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOCX (Max size: 10MB)
            </p>
            <Input
              id="file"
              type="file"
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              required
              ref={fileInputRef}
            />
            <Button variant="outline" className="mt-4">
              Select File
            </Button>
          </div>
        </div>

        {/* Public Toggle */}
        <div className="flex items-center space-x-2">
          <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
          <Label htmlFor="public">Make this collection public</Label>
        </div>

        {/* Submit Button */}
        <Button className="w-full" type="submit">
          Upload Document
        </Button>
      </form>
    </div>
  </main>
</div>

  );
}
