"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "../../../components/ui/CustomButton";
import { Badge } from "../../../components/ui/badge";
import { DashboardHeader } from "../../../components/ui/dashboard_headers";
import { Download, Lock, Globe, Pencil, Plus } from "lucide-react";

export default function CollectionDetailPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCollection, setEditedCollection] = useState({});
  const [userId, setUserId] = useState(null);
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch(`/api/collections/${id}`);
        const data = await res.json();
        setCollection(data);
        setEditedCollection(data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
    setUserId(localStorage.getItem("userId"));
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditedCollection({
      ...editedCollection,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setNewFile(e.target.files[0]);
    }
  };

  const handleUploadDocument = async () => {
    if (!newFile) return;
  
    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("collectionId", id);
  
    try {
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) throw new Error("File upload failed");
  
      const fileData = await res.json();
  
      const newDoc = {
        title: newFile.name,
        fileUrl: fileData.url,
        uploadDate: new Date(),
      };
  
      setEditedCollection((prev) => ({
        ...prev,
        documents: [...prev.documents, newDoc],
      }));
  
      setCollection((prev) => ({
        ...prev,
        documents: [...prev.documents, newDoc],
      }));
  
      setNewFile(null);
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };
  
  const handleSaveChanges = async () => {
    setIsEditing(false);
    try {
      const res = await fetch(`/api/collections/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...editedCollection , id}),
      });

      if (!res.ok) throw new Error("Failed to update collection");

      setCollection(editedCollection);
      
    } catch (error) {
      console.error("Error updating collection:", error);
    }
  };

  if (!collection) return <p>Loading...</p>;
  const isOwner = userId && collection.userId == userId;

  return (
    <div className="min-h-screen bg-background">
  <DashboardHeader />
  <main className="container mx-auto p-6 max-w-4xl">
    <div className="mb-8">
      {/* Title & Visibility Badge */}
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedCollection.title}
            onChange={handleInputChange}
            className="text-3xl font-bold border p-2 w-full"
          />
        ) : (
          <h1 className="text-3xl font-bold">{collection.title}</h1>
        )}

        <Badge variant="outline">
          {collection.visibility === "private" ? (
            <Lock className="w-4 h-4 mr-1" />
          ) : (
            <Globe className="w-4 h-4 mr-1" />
          )}
          {collection.visibility === "private" ? "Private" : "Public"}
        </Badge>
      </div>

      {/* Description */}
      {isEditing ? (
        <textarea
          name="description"
          value={editedCollection.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      ) : (
        <p className="text-muted-foreground mb-6">{collection.description}</p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        {isOwner && (
          <>
            <button className="flex items-center gap-2" onClick={handleEditToggle}>
              <Pencil className="w-4 h-4" />
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSaveChanges}>
                Save Changes
              </button>
            )}
          </>
        )}
      </div>
    </div>

    {/* Documents Section */}
    <div className="grid gap-6">
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>

        {/* File Upload */}
        {isOwner && (
          <div className="flex items-center gap-2 mb-4">
            <input type="file" onChange={handleFileChange} className="border p-2 w-full" />
            <button
              onClick={handleUploadDocument}
              disabled={!newFile}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-300"
            >
              <Plus className="w-4 h-4" />
              Upload
            </button>
          </div>
        )}

        {/* Documents List */}
        <div className="space-y-4">
          {collection.documents.length > 0 ? (
            collection.documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Added on {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <a href={doc.fileUrl} download target="_blank" rel="noopener noreferrer">
                  <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                    <Download className="w-4 h-4" />
                  </button>
                </a>
              </div>
            ))
          ) : (
            <p>No documents available.</p>
          )}
        </div>
      </div>
    </div>
  </main>
</div>

  );
}
