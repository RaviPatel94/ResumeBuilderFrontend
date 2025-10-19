"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { deleteSection, duplicateSection, updateResume, moveSectionUp, moveSectionDown } from "@/store/resumeSlice";
import { StyleProps } from "@/types";
import EditableSection from "@/components/EditableSection";

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
  const handleMoveUp = (id: string) => dispatch(moveSectionUp(id));
  const handleMoveDown = (id: string) => dispatch(moveSectionDown(id));

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
      {/* Gradient Header */}
      <div className="resume-header bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white p-8 text-center flex-shrink-0">
        <h1
          className="tracking-wide"
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
        <div className="w-24 h-1 bg-white mx-auto my-3 opacity-80"></div>
        <h2
          className="opacity-95 tracking-wide"
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

      {/* Single Column Content */}
      <div className="flex-1 overflow-hidden p-8">
        {/* Contact Section */}
        {resume.contact && (
          <div className="mb-8 pb-6 border-b-2 border-gradient">
            <div className="flex flex-wrap justify-center gap-4">
              {resume.contact.email && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
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
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
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
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
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
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
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

        {/* Skills Section */}
        {resume.skills && resume.skills.length > 0 && (
          <div className="mb-8">
            <h3
              className="mb-4 pb-2 border-b-2 border-pink-300"
              style={{ 
                color: headerColor,
                fontSize: `${headerSize}px`,
                fontWeight: headerBold ? 'bold' : 'normal'
              }}
            >
              SKILLS
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200"
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

        {/* Main Sections */}
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
              id={section.id}
              onDelete={() => handleDelete(section.id)}
              onDuplicate={() => handleDuplicate(section.id)}
              onMoveUp={() => handleMoveUp(section.id)}
              onMoveDown={() => handleMoveDown(section.id)}
              isFirst={index === 0}
              isLast={index === resume.sections.length - 1}
            >
              <div className="resume-section mb-8">
                <h3
                  className="mb-4 pb-2 border-b-2 border-pink-300"
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
                  className="leading-relaxed pl-4 border-l-4 border-gradient-to-b from-purple-400 to-pink-400"
                  style={{ 
                    color: bodyColor,
                    fontSize: `${bodySize}px`,
                    fontWeight: bodyBold ? 'bold' : 'normal',
                    borderImage: 'linear-gradient(to bottom, rgb(192, 132, 252), rgb(244, 114, 182)) 1'
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
  );
}