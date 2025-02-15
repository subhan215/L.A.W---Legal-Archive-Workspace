"use client";

import { useEffect, useState } from "react";

export function Switch({ checked, onChange, id }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-12 h-6 bg-gray-300 rounded-full" />; // Prevent SSR mismatch
  }

  return (
    <button
      id={id}
      type="button"
      className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
