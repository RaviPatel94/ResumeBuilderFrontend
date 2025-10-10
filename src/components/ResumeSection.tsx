// components/Editor/ResumeSection.tsx
"use client";
import React from "react";

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <h3 className="text-lg font-semibold text-black mb-2" contentEditable >{title}</h3>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
