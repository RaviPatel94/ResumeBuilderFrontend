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
        <div className="absolute -right-12 top-0 flex flex-col gap-2 z-10">
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

export default function CreativeTemplate() {
  const dispatch = useDispatch<AppDispatch>();
  const resume = useSelector((state: RootState) => state.resume.resume);
  const { name, title, sections, contact, skills } = resume;

  const handleDelete = (id: string) => dispatch(deleteSection(id));
  const handleDuplicate = (id: string) => dispatch(duplicateSection(id));

  return (
    <div className="w-[8.5in] h-[11in] mx-auto bg-white shadow-lg overflow-hidden flex flex-col">
      {/* Colorful Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 flex-shrink-0">
        <h1
          className="text-3xl font-bold mb-1"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {name}
        </h1>
        <h2
          className="text-base opacity-90"
          contentEditable
          suppressContentEditableWarning={true}
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[35%] bg-gradient-to-b from-purple-50 to-pink-50 p-5 overflow-y-auto flex-shrink-0">
          {contact && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-purple-700 mb-3 border-b-2 border-purple-300 pb-2">
                CONTACT
              </h3>
              <div className="space-y-2 text-xs text-gray-700">
                {contact.email && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span contentEditable suppressContentEditableWarning={true}>
                      {contact.email}
                    </span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                    <span contentEditable suppressContentEditableWarning={true}>
                      {contact.phone}
                    </span>
                  </div>
                )}
                {contact.location && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span contentEditable suppressContentEditableWarning={true}>
                      {contact.location}
                    </span>
                  </div>
                )}
                {contact.linkedin && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span contentEditable suppressContentEditableWarning={true}>
                      {contact.linkedin}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          {sections.find((s) => s.id === "education") && (
            <EditableSection
              section={sections.find((s) => s.id === "education")!}
              onDelete={() => handleDelete("education")}
              onDuplicate={() => handleDuplicate("education")}
            >
              <div className="mb-6">
                <h3 className="text-base font-bold text-pink-700 mb-3 border-b-2 border-pink-300 pb-2">
                  EDUCATION
                </h3>
                <div
                  className="text-xs text-gray-700 leading-relaxed"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {sections.find((s) => s.id === "education")?.content}
                </div>
              </div>
            </EditableSection>
          )}
          {sections.find((s) => s.id === "projects") && (
            <EditableSection
              section={sections.find((s) => s.id === "projects")!}
              onDelete={() => handleDelete("projects")}
              onDuplicate={() => handleDuplicate("projects")}
            >
              <div>
                <h3 className="text-base font-bold text-red-700 mb-3 border-b-2 border-red-300 pb-2">
                  PROJECTS
                </h3>
                <div
                  className="text-xs text-gray-700 leading-relaxed"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {sections.find((s) => s.id === "projects")?.content}
                </div>
              </div>
            </EditableSection>
          )}
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {sections.find((s) => s.id === "summary") && (
            <EditableSection
              section={sections.find((s) => s.id === "summary")!}
              onDelete={() => handleDelete("summary")}
              onDuplicate={() => handleDuplicate("summary")}
            >
              <div className="mb-6">
                <h3
                  className="text-xl font-bold text-gray-800 mb-3 flex items-center"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 mr-2"></div>
                  {sections.find((s) => s.id === "summary")?.title}
                </h3>
                <div
                  className="text-gray-700 text-sm leading-relaxed border-l-4 border-purple-300 pl-4"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {sections.find((s) => s.id === "summary")?.content}
                </div>
              </div>
            </EditableSection>
          )}
          {sections.find((s) => s.id === "experience") && (
            <EditableSection
              section={sections.find((s) => s.id === "experience")!}
              onDelete={() => handleDelete("experience")}
              onDuplicate={() => handleDuplicate("experience")}
            >
              <div className="mb-6">
                <h3
                  className="text-xl font-bold text-gray-800 mb-3 flex items-center"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 mr-2"></div>
                  {sections.find((s) => s.id === "experience")?.title}
                </h3>
                <div
                  className="text-gray-700 text-sm leading-relaxed border-l-4 border-pink-300 pl-4"
                  contentEditable
                  suppressContentEditableWarning={true}
                >
                  {sections.find((s) => s.id === "experience")?.content}
                </div>
              </div>
            </EditableSection>
          )}
          {sections
            .filter(
              (s) =>
                ![
                  "summary",
                  "experience",
                  "education",
                  "projects",
                ].includes(s.id)
            )
            .map((section) => (
              <EditableSection
                key={section.id}
                section={section}
                onDelete={() => handleDelete(section.id)}
                onDuplicate={() => handleDuplicate(section.id)}
              >
                <div className="mb-6">
                  <h3
                    className="text-xl font-bold text-gray-800 mb-3 flex items-center"
                    contentEditable
                    suppressContentEditableWarning={true}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 mr-2"></div>
                    {section.title}
                  </h3>
                  <div
                    className="text-gray-700 text-sm leading-relaxed border-l-4 border-purple-300 pl-4"
                    contentEditable
                    suppressContentEditableWarning={true}
                  >
                    {section.content}
                  </div>
                </div>
              </EditableSection>
            ))}
          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-purple-700 mb-3 border-b-2 border-purple-300 pb-2">
                SKILLS
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-pink-200 px-2 py-1 rounded font-mono text-xs"
                    contentEditable
                    suppressContentEditableWarning={true}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
