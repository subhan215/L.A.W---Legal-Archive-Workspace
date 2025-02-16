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
  const [newDocument, setNewDocument] = useState("");

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
    setUserId(localStorage.getItem("userId")); // Get userId from local storage
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

  const handleAddDocument = () => {
    if (newDocument.trim()) {
      setEditedCollection({
        ...editedCollection,
        documents: [...editedCollection.documents, { title: newDocument, url: newDocument }],
      });
      setNewDocument("");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCollection),
      });

      if (!res.ok) throw new Error("Failed to update collection");

      setCollection(editedCollection);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating collection:", error);
    }
  };

  if (!collection) return <p>Loading...</p>;
  console.log(userId , collection)
  const isOwner = userId && collection.userId == userId;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="mb-8">
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
              {collection.visibility === "private" ? <Lock className="w-3 h-3 mr-1" /> : <Globe className="w-3 h-3 mr-1" />}
              {collection.visibility === "private" ? "Private" : "Public"}
            </Badge>
          </div>

          {isEditing ? (
            <textarea
              name="description"
              value={editedCollection.description}
              onChange={handleInputChange}
              className="w-full p-2 border"
            />
          ) : (
            <p className="text-muted-foreground mb-6">{collection.description}</p>
          )}

          <div className="flex gap-4">
            {collection.documents.length > 0 && (
              <a href={collection.documents.map((doc) => doc.url).join(",")} download target="_blank" rel="noopener noreferrer">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </a>
            )}

            {isOwner && (
              <Button onClick={handleEditToggle}>
                <Pencil className="w-4 h-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              
            )}
          </div>

          {isEditing && (
            <Button className="mt-4" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          )}
        </div>

        <div className="grid gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Case Summary</h2>
            {isEditing ? (
              <textarea
                name="summary"
                value={editedCollection.summary || ""}
                onChange={handleInputChange}
                className="w-full p-2 border"
              />
            ) : (
              <p className="text-muted-foreground">{collection.summary || "No summary available."}</p>
            )}
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>

            {isEditing && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter document URL"
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                  className="border p-2 w-full"
                />
                <Button onClick={handleAddDocument}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {collection.documents.length > 0 ? (
                collection.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">Added on {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <a href={doc.fileUrl} download target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
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
