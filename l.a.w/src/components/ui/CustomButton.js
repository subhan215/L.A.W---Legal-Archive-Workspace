import React from "react";
import Link from "next/link";

const variants = {
  default: "bg-blue-600 hover:bg-blue-700 text-white",
  outline: "border border-white text-white hover:bg-white hover:text-black",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function CustomButton({ href, children, variant = "default", size = "md", asChild = false }) {
  const classes = `rounded-lg font-semibold transition duration-300 ${variants[variant]} ${sizes[size]}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
