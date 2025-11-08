"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import ClassicTemplate from "@/components/Templates/ClassicTemplate";
import ModernTemplate from "@/components/Templates/ModernTemplate";
import CreativeTemplate from "@/components/Templates/CreativeTemplate";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProjectName,
  updateProjectTemplate,
  resetStyles,
} from "@/store/projectSlice";
import { RootState } from "@/store/store";
import { ChevronDown, Edit2, Save, Download, Menu, X } from "lucide-react";
import RenderStyleControl from "@/components/renderStyleControl";
import { StyleProps } from "@/types";
import { pdf } from '@react-pdf/renderer';
import ClassicPDFTemplate from "@/components/PdfTemplates/ClassicPdf";
import ModernPDFTemplate from "@/components/PdfTemplates/ModernPdf";
import CreativePDFTemplate from "@/components/PdfTemplates/CreativePdf";
import ProtectedRoute from "@/components/protectedRoute";
import { projectAPI } from '@/utils/apis';

export default function EditorPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["name"])
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const currentProject = useSelector((state: RootState) => state.projects.currentProject);

  // Redirect if no project
  useEffect(() => {
    if (!currentProject) {
      console.log("No current project found, redirecting to templates...");
      router.push("/templates");
    }
  }, [currentProject, router]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const toggleButton = document.getElementById('sidebar-toggle');
      
      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  if (!currentProject) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    const styleProps: StyleProps = { ...currentProject.styles };
    switch (currentProject.template) {
      case "modern":
        return <ModernTemplate {...styleProps} />;
      case "creative":
        return <CreativeTemplate {...styleProps} />;
      case "classic":
      default:
        return <ClassicTemplate {...styleProps} />;
    }
  };

  const handleSaveDraft = async () => {
    if (!currentProject || isSaving) return;
    
    setIsSaving(true);
    try {
      console.log('Saving project:', currentProject.id);
      
      await projectAPI.updateProject(currentProject.id, {
        name: currentProject.name,
        template: currentProject.template,
        resume: currentProject.resume,
        styles: currentProject.styles,
      });
      
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Failed to save draft:', error);
      alert('Failed to save draft: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!currentProject) return;

    try {
      const { resume, styles, template } = currentProject;

      let PDFComponent;
      switch (template) {
        case 'modern':
          PDFComponent = ModernPDFTemplate;
          break;
        case 'creative':
          PDFComponent = CreativePDFTemplate;
          break;
        case 'classic':
        default:
          PDFComponent = ClassicPDFTemplate;
          break;
      }

      const blob = await pdf(
        <PDFComponent resume={resume} styles={styles} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentProject.name || 'Resume'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const templates = [
    {
      id: "classic",
      name: "Classic Professional",
      description: "Traditional black & white formal layout",
    },
    { id: "modern", name: "Modern Minimalist", description: "Clean layout" },
    {
      id: "creative",
      name: "Creative Two-Column",
      description: "Colorful layout",
    },
  ];

  const currentTemplateInfo = templates.find((t) => t.id === currentProject.template);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) newSet.delete(section);
      else newSet.add(section);
      return newSet;
    });
  };

  const SidebarContent = () => (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* Editable Title */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-1 px-2 flex items-center gap-1">
          <Edit2 className="w-3.5 h-3.5" /> Resume Title
        </h2>
        <input
          type="text"
          value={currentProject.name}
          onChange={(e) => dispatch(updateProjectName(e.target.value))}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#10B981] focus:outline-none"
          placeholder="Enter resume title..."
        />
      </div>

      {/* Template Selector */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-2 px-2">
          Template
        </h2>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#10B981] cursor-pointer"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-gray-900">
                {currentTemplateInfo?.name}
              </span>
              <span className="text-xs text-gray-500">
                {currentTemplateInfo?.description}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    dispatch(updateProjectTemplate(template.id));
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 cursor-pointer ${
                    currentProject.template === template.id
                      ? "bg-[#10B981]/10 border-r-2 border-[#10B981]"
                      : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {template.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {template.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Font Settings */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-2 px-2">
          Font Settings
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <RenderStyleControl
            label="Name"
            section="name"
            sizeKey="nameSize"
            colorKey="nameColor"
            boldKey="nameBold"
            minSize={20}
            maxSize={48}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <RenderStyleControl
            label="Job Title"
            section="title"
            sizeKey="titleSize"
            colorKey="titleColor"
            boldKey="titleBold"
            minSize={12}
            maxSize={24}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <RenderStyleControl
            label="Contact Info"
            section="contact"
            sizeKey="contactSize"
            colorKey="contactColor"
            boldKey="contactBold"
            minSize={10}
            maxSize={18}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <RenderStyleControl
            label="Section Headers"
            section="header"
            sizeKey="headerSize"
            colorKey="headerColor"
            boldKey="headerBold"
            minSize={14}
            maxSize={24}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <RenderStyleControl
            label="Body Text"
            section="body"
            sizeKey="bodySize"
            colorKey="bodyColor"
            boldKey="bodyBold"
            minSize={10}
            maxSize={18}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <button
          className="w-full px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center gap-2 text-sm transition"
          onClick={() => dispatch(resetStyles())}
        >
          Reset Style
        </button>
        <button
          className="w-full px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
          onClick={handleSaveDraft}
          disabled={isSaving}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="w-full px-4 py-2 cursor-pointer bg-[#10B981] text-white rounded-lg hover:bg-[#0F9A6B] active:bg-[#0D8A5C] flex items-center justify-center gap-2 text-sm transition"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="h-screen overflow-hidden">
        <Navbar />
        
        {/* Mobile Sidebar Toggle Button */}
        <button
          id="sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-[#10B981] text-white rounded-full shadow-lg hover:bg-[#0F9A6B] active:bg-[#0D8A5C] transition cursor-pointer"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="h-screen pt-16 bg-gray-50">
          <div className="flex h-[calc(100vh-64px)] relative">
            {/* Desktop Left Panel */}
            <div className="hidden lg:block w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <SidebarContent />
            </div>



            {/* Mobile Sidebar */}
            <div
              id="mobile-sidebar"
              className={`lg:hidden fixed left-0 top-16 bottom-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <SidebarContent />
            </div>
            
            {/* Resume Preview - Maintains aspect ratio */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-2 sm:p-4 lg:p-8">
              <div
                className="w-full mx-auto bg-white rounded-lg shadow"
                style={{
                  aspectRatio: '8.5 / 11',
                  maxWidth: '816px',
                }}
              >
                <div 
                  className="w-full h-full resume-preview-container"
                  ref={resumeRef}
                  data-resume-content
                >
                  <style>{`
                    .resume-preview-container {
                      font-size: 16px;
                      overflow: visible;
                    }
                    
                    /* Scale down font size on smaller screens */
                    @media (max-width: 640px) {
                      .resume-preview-container {
                        font-size: 10px;
                      }
                    }
                    
                    @media (min-width: 641px) and (max-width: 768px) {
                      .resume-preview-container {
                        font-size: 12px;
                      }
                    }
                    
                    @media (min-width: 769px) and (max-width: 1024px) {
                      .resume-preview-container {
                        font-size: 14px;
                      }
                    }
                    
                    /* Scale the entire resume container proportionally */
                    .resume-preview-container > div {
                      transform-origin: top left;
                      transition: transform 0.2s ease;
                    }
                    
                    @media (max-width: 640px) {
                      .resume-preview-container > div {
                        transform: scale(0.45);
                        width: 816px;
                      }
                      .resume-preview-container {
                        height: calc(1056px * 0.45);
                      }
                    }
                    
                    @media (min-width: 641px) and (max-width: 768px) {
                      .resume-preview-container > div {
                        transform: scale(0.6);
                        width: 816px;
                      }
                      .resume-preview-container {
                        height: calc(1056px * 0.6);
                      }
                    }
                    
                    @media (min-width: 769px) and (max-width: 1024px) {
                      .resume-preview-container > div {
                        transform: scale(0.8);
                        width: 816px;
                      }
                      .resume-preview-container {
                        height: calc(1056px * 0.8);
                      }
                    }
                    
                    @media (min-width: 1025px) {
                      .resume-preview-container > div {
                        transform: scale(1);
                        width: 816px;
                      }
                    }
                  `}</style>
                  {renderTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}