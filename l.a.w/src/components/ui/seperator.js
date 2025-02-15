"use client";

import React from "react";

export function Separator({ className = "", orientation = "horizontal" }) {
  const baseStyle = "bg-border";
  const orientationStyle = orientation === "horizontal" ? "h-px w-full" : "w-px h-full";

  return <div className={`${baseStyle} ${orientationStyle} ${className}`} />;
}
