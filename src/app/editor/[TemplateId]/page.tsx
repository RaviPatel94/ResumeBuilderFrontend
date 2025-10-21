"use client";
import { useParams, useRouter } from "next/navigation";
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
import { ChevronDown, Edit2, Save, Download } from "lucide-react";
import RenderStyleControl from "@/components/renderStyleControl";
import { StyleProps } from "@/types";
import { pdf } from '@react-pdf/renderer';
import ClassicPDFTemplate from "@/components/PdfTemplates/ClassicPdf";
import ModernPDFTemplate from "@/components/PdfTemplates/ModernPdf";
import CreativePDFTemplate from "@/components/PdfTemplates/CreativePdf";


export default function EditorPage() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["name"])
  );
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const currentProjectId = useSelector((state: RootState) => state.projects.currentProjectId);
  const currentProject = useSelector((state: RootState) => 
    currentProjectId ? state.projects.projects[currentProjectId] : null
  );

  // Wait for redux-persist to rehydrate
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirect if no project after loading
  useEffect(() => {
    if (!isLoading && !currentProjectId) {
      console.log("No current project found, redirecting to templates...");
      router.push("/templates");
    }
  }, [isLoading, currentProjectId, router]);

  // Show loading while waiting for persist rehydration or if no project
  if (isLoading || !currentProject) {
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
      return <ModernTemplate {...styleProps} />; // Web template
    case "creative":
      return <CreativeTemplate {...styleProps} />; // Web template
    case "classic":
    default:
      return <ClassicTemplate {...styleProps} />; // Web template
  }
};

  const handleSaveDraft = () => {
    console.log("Draft saved automatically via Redux Persist");
  };

const handleDownloadPDF = async () => {
  if (!currentProject) return;

  try {
    // Get the current resume and styles from Redux
    const { resume, styles, template } = currentProject;

    // Select the appropriate PDF template based on current template
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

    // Generate PDF blob - pass resume and styles as props
    const blob = await pdf(
      <PDFComponent resume={resume} styles={styles} />
    ).toBlob();

    // Download the PDF
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

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="h-screen pt-16 bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Left Panel */}
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Editable Title */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1 px-2 flex items-center gap-1">
                  <Edit2 className="w-3.5 h-3.5" /> Resume Title
                </h2>
                <input
                  type="text"
                  value={currentProject.name}
                  onChange={(e) => dispatch(updateProjectName({ 
                    projectId: currentProject.id, 
                    name: e.target.value 
                  }))}
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
                    className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#10B981]"
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
                            dispatch(updateProjectTemplate({ 
                              projectId: currentProject.id, 
                              template: template.id 
                            }));
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
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
                  className="w-full px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 text-sm"
                  onClick={() => dispatch(resetStyles(currentProject.id))}
                >
                  Reset Style
                </button>
                <button
                  className="w-full px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 text-sm"
                  onClick={handleSaveDraft}
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-2 cursor-pointer bg-[#10B981] text-white rounded-lg hover:bg-[#0F9A6B] flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div
            className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow"
            ref={resumeRef}
            data-resume-content
          >
            {renderTemplate()}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}