"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "../../../components/ui/CustomButton";
import { Badge } from "../../../components/ui/badge";
import { DashboardHeader } from "../../../components/ui/dashboard_headers";
import { Download, Lock, Globe } from "lucide-react";

export default function CollectionDetailPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch(`/api/collections/${id}`);
        const data = await res.json();
        setCollection(data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
  }, [id]);

  if (!collection) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{collection.title}</h1>
            <Badge variant="outline">
              {collection.visibility === "private" ? <Lock className="w-3 h-3 mr-1" /> : <Globe className="w-3 h-3 mr-1" />}
              {collection.visibility === "private" ? "Private" : "Public"}
            </Badge>
          </div>
          <div className="flex gap-2 mb-4">
            {collection.tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
          <p className="text-muted-foreground mb-6">{collection.description}</p>
          <div className="flex gap-4">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Documents
            </Button>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Make Public
            </Button>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Case Summary</h2>
            <p className="text-muted-foreground">{collection.summary || "No summary available."}</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="space-y-4">
              {collection.documents.length > 0 ? (
                collection.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">Added on {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
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
