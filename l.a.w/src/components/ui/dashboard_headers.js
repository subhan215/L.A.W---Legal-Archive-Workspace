"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./CustomButton";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";

export function DashboardHeader() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Replace with actual authentication logic
    const getUserId = () => {
      return localStorage.getItem("userId"); // Example: Fetch from localStorage or API
    };

    setUserId(getUserId());
  }, []);

  return (
    <header className="border-b">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-xl font-bold">
              L.A.W.
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              {userId && (
                <>
                  <Link href="/collections" className="text-sm font-medium hover:text-primary">
                    My Collections
                  </Link>
                  <Link href="/upload" className="text-sm font-medium hover:text-primary">
                    Upload
                  </Link>
                </>
              )}
            </nav>
          </div>
         {/* <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/login">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
      </div>
    </header>
  );
}
