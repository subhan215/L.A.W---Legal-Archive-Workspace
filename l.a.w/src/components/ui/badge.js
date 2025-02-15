import React from "react";
import clsx from "clsx";

const badgeVariants = {
  default: "bg-gray-200 text-gray-800",
  outline: "border border-gray-300 text-gray-800",
  primary: "bg-blue-500 text-white",
  success: "bg-green-500 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
};

export function Badge({ variant = "default", children, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}