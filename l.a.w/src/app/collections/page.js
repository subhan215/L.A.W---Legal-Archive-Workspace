"use client";

import { useEffect, useState } from "react";
import Button from "../../components/ui/CustomButton";
import Input from "../../components/ui/input";
import { Search } from "lucide-react";
import { CaseCard } from "../../components/ui/case-card";
import { DashboardHeader } from "../../components/ui/dashboard_headers";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Collections</h1>
          <Button>Create Collection</Button>
        </div>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search your collections..." className="pl-10" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.length > 0 ? (
            collections.map((collection) => (
              <CaseCard
                key={collection._id}
                title={collection.title}
                isPrivate={collection.visibility === "private"}
                link={`/collections/${collection._id}`}
              />
            ))
          ) : (
            <p>No collections found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
