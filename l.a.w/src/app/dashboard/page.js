"use client";

import { useEffect, useState } from "react";
import Button from "../../components/ui/CustomButton";
import Input from "@/components/ui/input";
import { CaseCard } from "@/components/ui/case-card";
import { DashboardHeader } from "../../components/ui/dashboard_headers";
import { Search } from "lucide-react";

export default function DashboardPage() {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();

        // Filter only public collections
        const publicCollections = data.filter(
          (collection) => collection.visibility === "public"
        );

        setCollections(publicCollections);
        setFilteredCollections(publicCollections); // ✅ Initialize filtered data
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  // ✅ Improved Filtering Function
  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredCollections(collections);
    } else {
      const filtered = collections.filter((collection) => {
        const title = collection.title?.toLowerCase() || "";
        const description = collection.description?.toLowerCase() || "";
        const category = collection.category?.toLowerCase() || ""; // Optional

        return (
          title.includes(query) ||
          description.includes(query) ||
          category.includes(query)
        );
      });

      setFilteredCollections(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Public Collections</h1>
        </div>
        <div className="relative mb-8">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search public collections..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch} // ✅ Real-time search
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <CaseCard
                key={collection._id}
                title={collection.title}
                isPrivate={collection.visibility === "private"}
                desc={collection.description}
                link={`/collections/${collection._id}`}
              />
            ))
          ) : (
            <p>No public collections found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
