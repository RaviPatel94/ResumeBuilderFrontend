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
import { StyleProps, Section } from "@/types";
import EditableSection from "@/components/EditableSection";

export default function ClassicTemplate({
  nameSize = 36,
  nameColor = "#000000",
  nameBold = true,
  titleSize = 16,
  titleColor = "#000000",
  titleBold = false,
  contactSize = 12,
  contactColor = "#000000",
  contactBold = false,
  headerSize = 18,
  headerColor = "#000000",
  headerBold = true,
  bodySize = 14,
  bodyColor = "#000000",
  bodyBold = false,
}: StyleProps = {}) {
  const dispatch = useDispatch<AppDispatch>();
  
  const currentProjectId = useSelector((state: RootState) => state.projects.currentProjectId);
  const currentProject = useSelector((state: RootState) => 
    currentProjectId ? state.projects.projects[currentProjectId] : null
  );
  
  const [pageBreaks, setPageBreaks] = React.useState<number[]>([]);
  const contentRef = React.useRef<HTMLDivElement>(null);

  if (!currentProject) return null;

  const resume = currentProject.resume;

  const handleDelete = (id: string) => {
    if (!currentProjectId) return;
    dispatch(deleteSection({ projectId: currentProjectId, sectionId: id }));
  };

  const handleDuplicate = (id: string) => {
    if (!currentProjectId) return;
    dispatch(duplicateSection({ projectId: currentProjectId, sectionId: id }));
  };

  const handleMoveUp = (id: string) => {
    if (!currentProjectId) return;
    dispatch(moveSectionUp({ projectId: currentProjectId, sectionId: id }));
  };

  const handleMoveDown = (id: string) => {
    if (!currentProjectId) return;
    dispatch(moveSectionDown({ projectId: currentProjectId, sectionId: id }));
  };

  // Text change handlers
  const handleTextChange = (type: 'name' | 'title', value: string) => {
    if (!currentProjectId) return;
    dispatch(updateProjectResume({
      projectId: currentProjectId,
      resume: {
        ...resume,
        [type]: value
      }
    }));
  };

  const handleContactChange = (field: 'email' | 'phone' | 'location' | 'linkedin', value: string) => {
    if (!currentProjectId) return;
    dispatch(updateProjectResume({
      projectId: currentProjectId,
      resume: {
        ...resume,
        contact: {
          ...resume.contact,
          [field]: value
        }
      }
    }));
  };

  const handleSectionChange = (sectionId: string, field: 'title' | 'content', value: string) => {
    if (!currentProjectId) return;
    dispatch(updateProjectResume({
      projectId: currentProjectId,
      resume: {
        ...resume,
        sections: resume.sections.map((section: Section) =>
          section.id === sectionId
            ? { ...section, [field]: value }
            : section
        )
      }
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
    <div ref={contentRef} className="w-[816px] min-h-[1056px] relative mx-auto bg-white border-2 border-black overflow-hidden flex flex-col">
      <div className="resume-header text-center p-8 pb-6 border-b-4 border-black flex-shrink-0">
        <h1
          className="font-serif tracking-wide uppercase"
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
          className="font-serif tracking-widest uppercase mt-2"
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
        {resume.contact && (
          <div 
            className="font-mono mt-3"
            style={{ 
              color: contactColor,
              fontSize: `${contactSize}px`,
              fontWeight: contactBold ? 'bold' : 'normal'
            }}
          >
            <div className="mb-1">
              <span 
                contentEditable 
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContactChange('email', e.currentTarget.textContent || '')}
              >
                {resume.contact.email}
              </span>{" "}
              |{" "}
              <span 
                contentEditable 
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContactChange('phone', e.currentTarget.textContent || '')}
              >
                {resume.contact.phone}
              </span>
            </div>
            <div>
              <span 
                contentEditable 
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContactChange('location', e.currentTarget.textContent || '')}
              >
                {resume.contact.location}
              </span>{" "}
              |{" "}
              <span 
                contentEditable 
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContactChange("linkedin", e.currentTarget.textContent || '')}
              >
                {resume.contact.linkedin}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-hidden p-8">
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
                  className="font-serif uppercase tracking-wider mb-3 text-center"
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
                <hr className="border-black mb-3" />
                <div
                  className="leading-7 font-serif text-justify px-4"
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
  );
}