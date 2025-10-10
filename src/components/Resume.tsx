// components/Editor/Resume.tsx
"use client";
import React from "react";
import ResumeSection from "./ResumeSection";

export interface Section {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface ResumeProps {
  name: string;
  title: string;
  sections: Section[];
}

export default function Resume({ name, title, sections }: ResumeProps) {
  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-black mb-3">{name}</h1>
      <h2 className="text-xl text-[#10B981] mb-6">{title}</h2>

      {sections.map((section) => (
        <ResumeSection key={section.id} title={section.title}>
          {section.content}
        </ResumeSection>
      ))}
    </div>
  );
}
