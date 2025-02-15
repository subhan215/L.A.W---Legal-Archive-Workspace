"use client";

import { useState } from "react";
import Button from "../../components/ui/CustomButton";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import Textarea from "../../components/ui/text_area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DashboardHeader } from "../../components/ui/dashboard_headers";
import { Upload } from "lucide-react";

export default function UploadPage() {
  const [isPublic, setIsPublic] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

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
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Upload Document</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Case Title</Label>
              <Input id="title" placeholder="Enter case title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Legal Category</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="civil">Civil Law</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="constitutional">Constitutional Law</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Case Description</Label>
              <Textarea id="description" placeholder="Enter a brief description of the case" rows={4} value={formData.description} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Upload Document</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to select</p>
                <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX (Max size: 10MB)</p>
                <Input id="file" type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} required />
                <Button variant="outline" className="mt-4" onClick={() => document.getElementById("file").click()}>
                  Select File
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="public">Make this collection public</Label>
            </div>
            <Button className="w-full" type="submit">
              Upload Document
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
