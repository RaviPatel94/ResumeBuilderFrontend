// components/Templates/ClassicTemplate.tsx
"use client";
import React from "react";
import { Section } from "../Resume";

interface ClassicTemplateProps {
  name: string;
  title: string;
  sections: Section[];
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
}

export default function ClassicTemplate({ name, title, sections, contact }: ClassicTemplateProps) {
  return (
    <div className="p-12 max-w-4xl mx-auto bg-white border-2 border-black">
      {/* Traditional Header */}
      <div className="text-center mb-8 pb-6 border-b-4 border-black">
        <h1 
          className="text-5xl font-serif font-bold text-black mb-2 tracking-wide uppercase"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {name}
        </h1>
        <h2 
          className="text-lg font-serif text-black mb-4 tracking-widest uppercase"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {title}
        </h2>
        {contact && (
          <div className="text-sm text-black font-mono">
            <div className="mb-1">
              <span contentEditable suppressContentEditableWarning={true}>{contact.email}</span> | <span contentEditable suppressContentEditableWarning={true}>{contact.phone}</span>
            </div>
            <div>
              <span contentEditable suppressContentEditableWarning={true}>{contact.location}</span> | <span contentEditable suppressContentEditableWarning={true}>{contact.linkedin}</span>
            </div>
          </div>
        )}
      </div>

      {/* Formal Sections */}
      {sections.map((section) => (
        <div key={section.id} className="mb-8">
          <h3 
            className="text-xl font-serif font-bold text-black uppercase tracking-wider mb-4 text-center"
            contentEditable
            suppressContentEditableWarning={true}
          >
            {section.title}
          </h3>
          <hr className="border-black mb-4" />
          <div 
            className="text-black leading-7 font-serif text-justify px-4"
            contentEditable
            suppressContentEditableWarning={true}
          >
            {section.content}
          </div>
        </div>
      ))}
      
      {/* Traditional Footer Line */}
      <div className="mt-12 pt-4 border-t-2 border-black text-center text-xs font-mono text-black">
        CONFIDENTIAL RESUME
      </div>
    </div>
  );
}
