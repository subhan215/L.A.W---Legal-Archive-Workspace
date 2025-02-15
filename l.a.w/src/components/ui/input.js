"use client";

import React from "react";

export default function Input({ id, label, type = "text", placeholder, required, value, onChange }) {
  return (
    <div className="space-y-2">
      {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-primary focus:outline-none"
      />
    </div>
  );
}
