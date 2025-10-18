"use client";
import React, { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { deleteSection, duplicateSection, updateResume } from "@/store/resumeSlice";
import { Section } from "@/types";
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

export default function ClassicTemplate() {
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

      const PAGE_HEIGHT = 1056; // Standard letter size in pixels at 96 DPI
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
    <div ref={contentRef} className="w-[816px] min-h-[1056px] relative mx-auto bg-white border-2 border-black overflow-hidden flex flex-col">
      <div className="resume-header text-center p-8 pb-6 border-b-4 border-black flex-shrink-0">
        <h1
          className="text-4xl font-serif font-bold text-black mb-2 tracking-wide uppercase"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => handleTextChange('name', e.currentTarget.textContent || '')}
        >
          {resume.name}
        </h1>
        <h2
          className="text-base font-serif text-black mb-3 tracking-widest uppercase"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
        >
          {resume.title}
        </h2>
        {resume.contact && (
          <div className="text-xs text-black font-mono">
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
        {resume.sections.map((section, index) => (
          <React.Fragment key={section.id}>
            {pageBreaks.includes(index) && (
              <div className="my-8">
                {/* Top page shadow/edge */}
                <div className="h-3 bg-gradient-to-b from-white via-gray-100 to-gray-300 border-b border-gray-300 shadow-md"></div>
                
                {/* Page number indicator */}
                <div className="bg-gray-500 text-white text-center py-3 text-sm font-semibold tracking-widest">
                  Page Break
                </div>
                
                {/* Bottom page shadow/edge */}
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
                  className="text-lg font-serif font-bold text-black uppercase tracking-wider mb-3 text-center"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleSectionChange(section.id, 'title', e.currentTarget.textContent || '')}
                >
                  {section.title}
                </h3>
                <hr className="border-black mb-3" />
                <div
                  className="text-black text-sm leading-7 font-serif text-justify px-4"
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

        {/* Skills Section */}
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-serif font-bold text-black uppercase tracking-wider mb-3 text-center">
              SKILLS
            </h3>
            <div className="flex text-black flex-wrap gap-2 justify-center">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-3 py-1 rounded font-mono text-xs"
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
    </div>
  );
}
