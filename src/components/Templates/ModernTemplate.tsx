"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { 
  deleteSection, 
  duplicateSection, 
  updateProjectResume, 
  moveSectionUp, 
  moveSectionDown 
} from "@/store/projectSlice";
import { Section, StyleProps } from "@/types";
import EditableSection from "@/components/EditableSection";

export default function ModernTemplate({
  nameSize = 36,
  nameColor = "#fff",
  nameBold = true,
  titleSize = 16,
  titleColor = "#fff",
  titleBold = false,
  contactSize = 12,
  contactColor = "#222",
  contactBold = false,
  headerSize = 18,
  headerColor = "#222",
  headerBold = true,
  bodySize = 14,
  bodyColor = "#222",
  bodyBold = false,
}: StyleProps = {}) {
  const dispatch = useDispatch<AppDispatch>();
  
  const currentProject = useSelector((state: RootState) => state.projects.currentProject);
  
  const [pageBreaks, setPageBreaks] = React.useState<number[]>([]);
  const contentRef = React.useRef<HTMLDivElement>(null);

  if (!currentProject) return null;

  const resume = currentProject.resume;

  const handleDelete = (id: string) => {
    dispatch(deleteSection(id));
  };

  const handleDuplicate = (id: string) => {
    dispatch(duplicateSection(id));
  };

  const handleMoveUp = (id: string) => {
    dispatch(moveSectionUp(id));
  };

  const handleMoveDown = (id: string) => {
    dispatch(moveSectionDown(id));
  };

  // Text change handlers
  const handleTextChange = (type: 'name' | 'title', value: string) => {
    dispatch(updateProjectResume({
      ...resume,
      [type]: value
    }));
  };

  const handleContactChange = (field: 'email' | 'phone' | 'location' | 'linkedin', value: string) => {
    dispatch(updateProjectResume({
      ...resume,
      contact: {
        ...resume.contact,
        [field]: value
      }
    }));
  };

  const handleSectionChange = (sectionId: string, field: 'title' | 'content', value: string) => {
    dispatch(updateProjectResume({
      ...resume,
      sections: resume.sections.map((section: Section) =>
        section.id === sectionId
          ? { ...section, [field]: value }
          : section
      )
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
  }, [resume.sections]);

  return (
    <div ref={contentRef} className="w-[816px] min-h-[1056px] mx-auto bg-white shadow-2xl border border-gray-200 overflow-visible flex flex-col">
      {/* Minimalist Header */}
      <div className="resume-header bg-gray-500 text-white p-6 flex-shrink-0">
        <h1
          className="font-thin tracking-wide mb-2"
          style={{ 
            color: nameColor,
            fontSize: `${nameSize}px`,
            fontWeight: nameBold ? 'bold' : '100'
          }}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => handleTextChange('name', e.currentTarget.textContent || '')}
        >
          {resume.name?.toUpperCase()}
        </h1>
        <div className="w-16 h-px bg-black mb-2"></div>
        <h2
          className="font-light tracking-wider"
          style={{ 
            color: titleColor,
            fontSize: `${titleSize}px`,
            fontWeight: titleBold ? 'bold' : '300'
          }}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
        >
          {resume.title}
        </h2>
      </div>
      <div className="flex-1 p-6">
        <div className="h-full">
          {/* Contact Info */}
          {resume.contact && (
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
              <span
                className="rounded-full border px-3 py-1"
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
              <span
                className="rounded-full border px-3 py-1"
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
              <span
                className="rounded-full border px-3 py-1"
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
              <span
                className="rounded-full border px-3 py-1"
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

          {resume.sections.map((section: Section, index: number) => (
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
                <div className="resume-section mb-6">
                  <h3
                    className="text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b-2 border-black"
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
                    className="text-gray-700 leading-relaxed"
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