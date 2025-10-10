// components/Templates/ModernTemplate.tsx
"use client";
import React from "react";
import { Section } from "../Resume";

interface ModernTemplateProps {
  name: string;
  title: string;
  sections: Section[];
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
  skills?: string[];
}

export default function ModernTemplate({ name, title, sections, contact, skills }: ModernTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl border border-gray-200">
      {/* Minimalist Header */}
      <div className="bg-black text-white p-8">
        <h1 
          className="text-4xl font-thin tracking-wide mb-2"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {name.toUpperCase()}
        </h1>
        <div className="w-16 h-px bg-white mb-3"></div>
        <h2 
          className="text-lg font-light tracking-wider"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {title}
        </h2>
      </div>

      <div className="p-8">
        {/* Contact Info - Horizontal Pills */}
        {contact && (
          <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-gray-200">
            {contact.email && (
              <span 
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full border"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {contact.email}
              </span>
            )}
            {contact.phone && (
              <span 
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full border"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {contact.phone}
              </span>
            )}
            {contact.location && (
              <span 
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full border"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {contact.location}
              </span>
            )}
            {contact.linkedin && (
              <span 
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full border"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {contact.linkedin}
              </span>
            )}
          </div>
        )}

        {/* Skills Bar */}
        {skills && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-black text-white text-sm font-medium"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main Sections */}
        {sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h3 
              className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b-2 border-black"
              contentEditable
              suppressContentEditableWarning={true}
            >
              {section.title}
            </h3>
            <div 
              className="text-gray-700 leading-relaxed"
              contentEditable
              suppressContentEditableWarning={true}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
