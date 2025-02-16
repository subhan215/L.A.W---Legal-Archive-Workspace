"use client";

import { useEffect, useState } from "react";
import Button from "../../components/ui/CustomButton";
import Input from "../../components/ui/input";
import { Search, Trash2 } from "lucide-react";
import { CaseCard } from "../../components/ui/case-card";
import { DashboardHeader } from "../../components/ui/dashboard_headers";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();

        const userCollections = data.filter(
          (collection) => String(collection.userId) === storedUserId
        );

        setCollections(userCollections);
        setFilteredCollections(userCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    if (storedUserId && searchQuery === "") {
      fetchCollections();
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredCollections(collections);
    } else {
      const filtered = collections.filter((collection) => {
        const category = collection.category?.toLowerCase() || "";
        const description = collection.description?.toLowerCase() || "";
        const title = collection.title?.toLowerCase() || "";
        return category.includes(query) || description.includes(query) || title.includes(query);
      });

      setFilteredCollections(filtered);
    }
  };

  const handleDelete = async (collectionId) => {
    try {
      const res = await fetch(`/api/collections/${collectionId}/delete`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete collection");
      }
      
      setCollections((prev) => prev.filter((collection) => collection._id !== collectionId));
      setFilteredCollections((prev) => prev.filter((collection) => collection._id !== collectionId));
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Collections</h1>
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
              <div key={collection._id} className="relative">
                <CaseCard
                  title={collection.title}
                  isPrivate={collection.visibility === "private"}
                  desc={collection.description}
                  link={`/collections/${collection._id}`}
                />
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(collection._id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <p>No collections found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
