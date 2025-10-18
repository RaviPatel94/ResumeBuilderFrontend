"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { deleteSection, duplicateSection } from "@/store/resumeSlice";
import { Trash2, Copy } from "lucide-react";
import { Section } from "../Resume";

function EditableSection({
  section,
  onDelete,
  onDuplicate,
  children,
}: {
  section: Section;
  onDelete: () => void;
  onDuplicate: () => void;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -right-4 bottom-0 flex flex-col gap-2 z-50">
          <button
            onClick={onDuplicate}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg"
            title="Duplicate section"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg"
            title="Delete section"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      {children}
    </div>
  );
}

export default function ModernTemplate() {
  const dispatch = useDispatch<AppDispatch>();
  const resume = useSelector((state: RootState) => state.resume.resume);

  const handleDelete = (id: string) => dispatch(deleteSection(id));
  const handleDuplicate = (id: string) => dispatch(duplicateSection(id));

  const name = resume?.name ?? "";
  const title = resume?.title ?? "";
  const sections = resume?.sections ?? [];
  const contact = resume?.contact;
  const skills = resume?.skills ?? [];

  return (
    <div className="w-[8.5in] h-[11in] mx-auto bg-white shadow-2xl border border-gray-200 overflow-visible flex flex-col">
      {/* Minimalist Header */}
      <div className="bg-black text-white p-6 flex-shrink-0">
        <h1
          className="text-3xl font-thin tracking-wide mb-2"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {name.toUpperCase()}
        </h1>
        <div className="w-16 h-px bg-white mb-2"></div>
        <h2
          className="text-base font-light tracking-wider"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {title}
        </h2>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="h-full">
          {/* Contact Info */}
          {contact && (
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
              {contact.email && (
                <span
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {contact.email}
                </span>
              )}
              {contact.phone && (
                <span
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {contact.phone}
                </span>
              )}
              {contact.location && (
                <span
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {contact.location}
                </span>
              )}
              {contact.linkedin && (
                <span
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {contact.linkedin}
                </span>
              )}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: String, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-black text-white text-xs font-medium"
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
          {sections.map((section: Section) => (
            <EditableSection
              key={section.id}
              section={section}
              onDelete={() => handleDelete(section.id)}
              onDuplicate={() => handleDuplicate(section.id)}
            >
              <div className="mb-6">
                <h3
                  className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b-2 border-black"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {section.title}
                </h3>
                <div
                  className="text-gray-700 text-sm leading-relaxed"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {section.content}
                </div>
              </div>
            </EditableSection>
          ))}
        </div>
      </div>
    </div>
  );
}
