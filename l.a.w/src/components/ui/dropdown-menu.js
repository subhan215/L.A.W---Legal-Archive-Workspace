import React from "react";
//import { cn } from "@/lib/utils";

export function DropdownMenu({ children, className = "" }) {
    return <div className={`relative inline-block text-left ${className}`}>{children}</div>;
  }
  
  export function DropdownMenuContent({ children, align = "left" }) {
    return (
      <div
        className={`absolute mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md p-2 ${
          align === "end" ? "right-0" : "left-0"
        }`}
      >
        {children}
      </div>
    );
  }
  

export function DropdownMenuTrigger({ children, asChild = false }) {
  return asChild ? children : <button className="focus:outline-none">{children}</button>;
}


export function DropdownMenuItem({ children }) {
  return (
    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md">
      {children}
    </div>
  );
}