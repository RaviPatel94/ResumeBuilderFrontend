// components/Templates/CreativeTemplate.tsx
"use client";
import React from "react";
import { Section } from "../Resume";

interface CreativeTemplateProps {
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

export default function CreativeTemplate({ name, title, sections, contact }: CreativeTemplateProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Colorful Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8">
        <h1 
          className="text-4xl font-bold mb-2"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {name}
        </h1>
        <h2 
          className="text-xl opacity-90"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {title}
        </h2>
      </div>

      <div className="flex">
        {/* Left Column - Contact & Skills */}
        <div className="w-1/3 bg-gradient-to-b from-purple-50 to-pink-50 p-6">
          {/* Contact Section */}
          {contact && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-purple-700 mb-4 border-b-2 border-purple-300 pb-2">
                CONTACT
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <span contentEditable suppressContentEditableWarning={true}>{contact.email}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mr-3"></div>
                  <span contentEditable suppressContentEditableWarning={true}>{contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                  <span contentEditable suppressContentEditableWarning={true}>{contact.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <span contentEditable suppressContentEditableWarning={true}>{contact.linkedin}</span>
                </div>
              </div>
            </div>
          )}

          {/* Education in Left Column */}
          {sections.find(s => s.id === 'education') && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-pink-700 mb-4 border-b-2 border-pink-300 pb-2">
                EDUCATION
              </h3>
              <div 
                className="text-sm text-gray-700 leading-relaxed"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {sections.find(s => s.id === 'education')?.content}
              </div>
            </div>
          )}

          {/* Projects in Left Column */}
          {sections.find(s => s.id === 'projects') && (
            <div>
              <h3 className="text-lg font-bold text-red-700 mb-4 border-b-2 border-red-300 pb-2">
                PROJECTS
              </h3>
              <div 
                className="text-sm text-gray-700 leading-relaxed"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {sections.find(s => s.id === 'projects')?.content}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {sections.find(s => s.id === 'summary') && (
            <div className="mb-8">
              <h3 
                className="text-2xl font-bold text-gray-800 mb-4 flex items-center"
                contentEditable
                suppressContentEditableWarning={true}
              >
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 mr-3"></div>
                {sections.find(s => s.id === 'summary')?.title}
              </h3>
              <div 
                className="text-gray-700 leading-relaxed border-l-4 border-purple-300 pl-4"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {sections.find(s => s.id === 'summary')?.content}
              </div>
            </div>
          )}

          {/* Experience */}
          {sections.find(s => s.id === 'experience') && (
            <div className="mb-8">
              <h3 
                className="text-2xl font-bold text-gray-800 mb-4 flex items-center"
                contentEditable
                suppressContentEditableWarning={true}
              >
                <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 mr-3"></div>
                {sections.find(s => s.id === 'experience')?.title}
              </h3>
              <div 
                className="text-gray-700 leading-relaxed border-l-4 border-pink-300 pl-4"
                contentEditable
                suppressContentEditableWarning={true}
              >
                {sections.find(s => s.id === 'experience')?.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
