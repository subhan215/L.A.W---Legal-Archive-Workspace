"use client";

import { useState, useEffect, useRef } from "react";

export default function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={selectRef}>
      <SelectTrigger onClick={() => setOpen((prev) => !prev)}>
        <SelectValue>
          {value ? options.find((o) => o.value === value)?.label : placeholder || "Select an option"}
        </SelectValue>
      </SelectTrigger>
      {open && (
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
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

function SelectTrigger({ children, onClick }) {
  return (
    <button
      type="button"
      className="w-full border px-4 py-2 rounded-lg bg-white text-left shadow-md focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SelectValue({ children }) {
  return <span>{children}</span>;
}

function SelectContent({ children }) {
  return (
    <div
      role="listbox"
      className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-auto"
    >
      {children}
    </div>
  );
}

function SelectItem({ children, onClick }) {
  return (
    <div
      role="option"
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
