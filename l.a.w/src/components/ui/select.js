"use client";

import { useState } from "react";

export function Select({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <SelectTrigger onClick={() => setOpen(!open)}>
        <SelectValue>{value ? options.find((o) => o.value === value)?.label : placeholder || "Select an option"}</SelectValue>
      </SelectTrigger>
      {open && (
        <SelectContent>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </div>
  );
}

export function SelectTrigger({ children, onClick }) {
  return (
    <button type="button" className="w-full border px-4 py-2 rounded-lg bg-white text-left" onClick={onClick}>
      {children}
    </button>
  );
}

export function SelectValue({ children }) {
  return <span>{children}</span>;
}

export function SelectContent({ children }) {
  return (
    <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
      {children}
    </div>
  );
}

export function SelectItem({ value, children, onClick }) {
  return (
    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}
