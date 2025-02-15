"use client";

import React, { useState } from "react";

export function Accordion({ children, className }) {
  return <div className={`border rounded-md ${className}`}>{children}</div>;
}

export function AccordionItem({ children, id, isOpen, onClick }) {
  return (
    <div className="border-b">
      <button
        className="w-full text-left p-4 font-medium flex justify-between items-center"
        onClick={() => onClick(id)}
      >
        {children[0]}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="p-4">{children[1]}</div>}
    </div>
  );
}

export function AccordionTrigger({ children }) {
  return <>{children}</>;
}

export function AccordionContent({ children }) {
  return <>{children}</>;
}

// Usage Example:

export function ExampleAccordion() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <Accordion>
      <AccordionItem id={1} isOpen={openItem === 1} onClick={toggleItem}>
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>Content for item 1</AccordionContent>
      </AccordionItem>
      <AccordionItem id={2} isOpen={openItem === 2} onClick={toggleItem}>
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>Content for item 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
