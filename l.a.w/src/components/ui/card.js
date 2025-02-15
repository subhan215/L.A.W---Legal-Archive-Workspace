import React from "react";
import clsx from "clsx";

export function Card({ className, children }) {
  return (
    <div
      className={clsx(
        "border border-gray-200 rounded-2xl shadow-sm bg-white p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={clsx("mb-3", className)}>{children}</div>;
}

export function CardContent({ className, children }) {
  return <div className={clsx("text-gray-700", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return <div className={clsx("mt-3", className)}>{children}</div>;
}
