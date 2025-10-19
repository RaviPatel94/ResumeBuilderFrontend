"use client";
import React, { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { deleteSection, duplicateSection, updateResume } from "@/store/resumeSlice";
import { Section, StyleProps } from "@/types";
import { Trash2, Copy } from "lucide-react";

function EditableSection({
  section,
  onDelete,
  onDuplicate,
  children,
}: {
  section: Section;
  onDelete: () => void;
  onDuplicate: () => void;
  children: ReactNode;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute left-0.5 right-0.5 -top-8 flex flex-row items-center justify-center gap-2 z-10">
          <button
            onClick={onDuplicate}
            className="p-2 h-8 w-8 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg"
            title="Duplicate section"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 h-8 w-8 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 shadow-lg"
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

export default function CreativeTemplate({
  nameSize = 36,
  nameColor = "#fff",
  nameBold = true,
  titleSize = 16,
  titleColor = "#fff",
  titleBold = false,
  contactSize = 12,
  contactColor = "#5b21b6",
  contactBold = false,
  headerSize = 18,
  headerColor = "#d946ef",
  headerBold = true,
  bodySize = 14,
  bodyColor = "#444",
  bodyBold = false,
}: StyleProps = {}) {
  const dispatch = useDispatch<AppDispatch>();
  const resume = useSelector((state: RootState) => state.resume.resume);
  const [pageBreaks, setPageBreaks] = React.useState<number[]>([]);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleDelete = (id: string) => dispatch(deleteSection(id));
  const handleDuplicate = (id: string) => dispatch(duplicateSection(id));

  // Text change handlers
  const handleTextChange = (type: 'name' | 'title', value: string) => {
    dispatch(updateResume({
      ...resume,
      [type]: value
    }));
  };

  const handleContactChange = (field: 'email' | 'phone' | 'location' | 'linkedin', value: string) => {
    dispatch(updateResume({
      ...resume,
      contact: {
        ...resume.contact,
        [field]: value
      }
    }));
  };

  const handleSectionChange = (sectionId: string, field: 'title' | 'content', value: string) => {
    dispatch(updateResume({
      ...resume,
      sections: resume.sections.map(section =>
        section.id === sectionId
          ? { ...section, [field]: value }
          : section
      )
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...(resume.skills || [])];
    newSkills[index] = value;
    dispatch(updateResume({
      ...resume,
      skills: newSkills
    }));
  };

  React.useEffect(() => {
    const calculatePageBreaks = () => {
      if (!contentRef.current) return;
      const PAGE_HEIGHT = 1056;
      const HEADER_HEIGHT = contentRef.current.querySelector('.resume-header')?.clientHeight || 0;
      const availableHeight = PAGE_HEIGHT - HEADER_HEIGHT;
      const sections = contentRef.current.querySelectorAll('.resume-section');
      let currentHeight = 0;
      const breaks: number[] = [];
      sections.forEach((section, index) => {
        const sectionHeight = section.clientHeight;
        if (currentHeight + sectionHeight > availableHeight) {
          breaks.push(index);
          currentHeight = sectionHeight;
        } else {
          currentHeight += sectionHeight;
        }
      });
      setPageBreaks(breaks);
    };
    calculatePageBreaks();
    window.addEventListener('resize', calculatePageBreaks);
    const observer = new MutationObserver(calculatePageBreaks);
    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
    return () => {
      window.removeEventListener('resize', calculatePageBreaks);
      observer.disconnect();
    };
  }, [resume.sections, resume.skills]);

  return (
    <div ref={contentRef} className="w-[816px] min-h-[1056px] mx-auto bg-white shadow-lg overflow-hidden flex flex-col">
      {/* Colorful Header */}
      <div className="resume-header bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 flex-shrink-0">
        <h1
          style={{ 
            color: nameColor,
            fontSize: `${nameSize}px`,
            fontWeight: nameBold ? 'bold' : 'normal'
          }}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => handleTextChange('name', e.currentTarget.textContent || '')}
        >
          {resume.name}
        </h1>
        <h2
          className="opacity-90 mt-1"
          style={{ 
            color: titleColor,
            fontSize: `${titleSize}px`,
            fontWeight: titleBold ? 'bold' : 'normal'
          }}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
        >
          {resume.title}
        </h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Column */}
        <div className="w-[35%] bg-gradient-to-b from-purple-50 to-pink-50 p-5 overflow-y-auto flex-shrink-0">
          {resume.contact && (
            <div className="mb-6">
              <h3 
                className="mb-3 border-b-2 border-purple-300 pb-2"
                style={{ 
                  color: headerColor,
                  fontSize: `${headerSize}px`,
                  fontWeight: headerBold ? 'bold' : 'normal'
                }}
              >
                CONTACT
              </h3>
              <div className="space-y-2">
                {resume.contact.email && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span
                      style={{ 
                        color: contactColor,
                        fontSize: `${contactSize}px`,
                        fontWeight: contactBold ? 'bold' : 'normal'
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleContactChange('email', e.currentTarget.textContent || '')}
                    >
                      {resume.contact.email}
                    </span>
                  </div>
                )}
                {resume.contact.phone && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                    <span
                      style={{ 
                        color: contactColor,
                        fontSize: `${contactSize}px`,
                        fontWeight: contactBold ? 'bold' : 'normal'
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleContactChange('phone', e.currentTarget.textContent || '')}
                    >
                      {resume.contact.phone}
                    </span>
                  </div>
                )}
                {resume.contact.location && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span
                      style={{ 
                        color: contactColor,
                        fontSize: `${contactSize}px`,
                        fontWeight: contactBold ? 'bold' : 'normal'
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleContactChange('location', e.currentTarget.textContent || '')}
                    >
                      {resume.contact.location}
                    </span>
                  </div>
                )}
                {resume.contact.linkedin && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span
                      style={{ 
                        color: contactColor,
                        fontSize: `${contactSize}px`,
                        fontWeight: contactBold ? 'bold' : 'normal'
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleContactChange('linkedin', e.currentTarget.textContent || '')}
                    >
                      {resume.contact.linkedin}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills Section in Left Column */}
          {resume.skills && resume.skills.length > 0 && (
            <div className="mb-6">
              <h3
                className="mb-3 border-b-2 border-purple-300 pb-2"
                style={{ 
                  color: headerColor,
                  fontSize: `${headerSize}px`,
                  fontWeight: headerBold ? 'bold' : 'normal'
                }}
              >
                SKILLS
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {resume.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-pink-200 px-2 py-1 rounded font-mono"
                    style={{ 
                      color: bodyColor,
                      fontSize: `${bodySize}px`,
                      fontWeight: bodyBold ? 'bold' : 'normal'
                    }}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleSkillChange(idx, e.currentTarget.textContent || '')}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 p-6 overflow-y-auto">
          {resume.sections.map((section, index) => (
            <React.Fragment key={section.id}>
              {pageBreaks.includes(index) && (
                <div className="my-8">
                  <div className="h-3 bg-gradient-to-b from-white via-gray-100 to-gray-300 border-b border-gray-300 shadow-md"></div>
                  <div className="bg-gray-500 text-white text-center py-3 text-sm font-semibold tracking-widest">
                    Page Break
                  </div>
                  <div className="h-3 bg-gradient-to-b from-gray-300 via-gray-100 to-white border-t border-gray-300 shadow-md"></div>
                </div>
              )}
              <EditableSection
                section={section}
                onDelete={() => handleDelete(section.id)}
                onDuplicate={() => handleDuplicate(section.id)}
              >
                <div className="resume-section mb-6">
                  <h3
                    className="mb-3 border-b-2 border-pink-300 pb-2"
                    style={{ 
                      color: headerColor,
                      fontSize: `${headerSize}px`,
                      fontWeight: headerBold ? 'bold' : 'normal'
                    }}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleSectionChange(section.id, 'title', e.currentTarget.textContent || '')}
                  >
                    {section.title}
                  </h3>
                  <div
                    className="text-gray-700 leading-relaxed border-l-4 border-purple-300 pl-4"
                    style={{ 
                      color: bodyColor,
                      fontSize: `${bodySize}px`,
                      fontWeight: bodyBold ? 'bold' : 'normal'
                    }}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleSectionChange(section.id, 'content', e.currentTarget.textContent || '')}
                  >
                    {section.content}
                  </div>
                </div>
              </EditableSection>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}