"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import ClassicTemplate from "@/components/Templates/ClassicTemplate";
import ModernTemplate from "@/components/Templates/ModernTemplate";
import CreativeTemplate from "@/components/Templates/CreativeTemplate";
import { useDispatch, useSelector } from "react-redux";
import {
  setTemplate,
  updateSingleStyle,
  updateResumeTitle, 
} from "@/store/resumeSlice";
import { RootState } from "@/store/store";
import {
  ChevronDown,
  ChevronRight,
  Type,
  Palette,
  Save,
  Download,
  Edit2,
} from "lucide-react";
import { StyleProps } from "@/types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EditorPage() {
  const params = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["name"]));

  const dispatch = useDispatch();
  const resumeRef = useRef<HTMLDivElement>(null);
  const currentTemplate = useSelector((state: RootState) => state.resume.data.template);
  const resumeTitle = useSelector((state: RootState) => state.resume.data.title);
  const styles = useSelector((state: RootState) => state.resume.styles);

  useEffect(() => {
    if (params?.templateId) {
      dispatch(setTemplate(params.templateId as string));
    }
  }, [params, dispatch]);

  const renderTemplate = () => {
    const styleProps: StyleProps = { ...styles };
    switch (currentTemplate) {
      case "modern":
        return <ModernTemplate {...styleProps} />;
      case "creative":
        return <CreativeTemplate {...styleProps} />;
      case "classic":
      default:
        return <ClassicTemplate {...styleProps} />;
    }
  };

  const handleSaveDraft = () => {
    console.log("Draft saved automatically via Redux Persist");
  };

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let y = 0;
    while (y < imgHeight) {
      pdf.addImage(imgData, "PNG", 0, -y, imgWidth, imgHeight);
      y += pageHeight;
      if (y < imgHeight) pdf.addPage();
    }

    pdf.save(`${resumeTitle || "My_Resume"}.pdf`);
  };

  const templates = [
    { id: "classic", name: "Classic Professional", description: "Traditional black & white formal layout" },
    { id: "modern", name: "Modern Minimalist", description: "Clean layout" },
    { id: "creative", name: "Creative Two-Column", description: "Colorful layout" },
  ];

  const currentTemplateInfo = templates.find((t) => t.id === currentTemplate);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) newSet.delete(section);
      else newSet.add(section);
      return newSet;
    });
  };

  const renderStyleControl = (
    label: string,
    section: string,
    sizeKey: keyof StyleProps,
    colorKey: keyof StyleProps,
    boldKey: keyof StyleProps,
    minSize: number,
    maxSize: number
  ) => {
    const size = styles[sizeKey] as number;
    const color = styles[colorKey] as string;
    const bold = styles[boldKey] as boolean;

    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <button
          onClick={() => toggleSection(section)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-2">
            {expandedSections.has(section) ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: color }} />
            <span className="text-xs text-gray-500">{size}px</span>
          </div>
        </button>
        {expandedSections.has(section) && (
          <div className="px-4 pb-4 space-y-3 bg-gray-50">
            <div className="flex items-center gap-3">
              <Type className="w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={size}
                onChange={(e) =>
                  dispatch(updateSingleStyle({ key: sizeKey, value: Number(e.target.value) }))
                }
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#10B981]"
                min={minSize}
                max={maxSize}
              />
              <input
                type="range"
                value={size}
                onChange={(e) =>
                  dispatch(updateSingleStyle({ key: sizeKey, value: Number(e.target.value) }))
                }
                className="flex-1"
                min={minSize}
                max={maxSize}
              />
            </div>
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4 text-gray-400" />
              <input
                type="color"
                value={color}
                onChange={(e) =>
                  dispatch(updateSingleStyle({ key: colorKey, value: e.target.value }))
                }
                className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) =>
                  dispatch(updateSingleStyle({ key: colorKey, value: e.target.value }))
                }
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#10B981]"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`${section}Bold`}
                checked={bold}
                onChange={(e) =>
                  dispatch(updateSingleStyle({ key: boldKey, value: e.target.checked }))
                }
                className="w-4 h-4 cursor-pointer border-gray-300 rounded focus:ring-[#10B981]"
              />
              <label htmlFor={`${section}Bold`} className="text-sm text-gray-600">
                Bold
              </label>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="h-screen pt-16 bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Left Panel */}
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* ✅ Editable Title */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1 px-2 flex items-center gap-1">
                  <Edit2 className="w-3.5 h-3.5" /> Resume Title
                </h2>
                <input
                  type="text"
                  value={resumeTitle}
                  onChange={(e) => dispatch(updateResumeTitle(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#10B981] focus:outline-none"
                  placeholder="Enter resume title..."
                />
              </div>

              {/* Template Selector */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-2 px-2">Template</h2>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#10B981]"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-900">{currentTemplateInfo?.name}</span>
                      <span className="text-xs text-gray-500">{currentTemplateInfo?.description}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => {
                            dispatch(setTemplate(template.id));
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                            currentTemplate === template.id ? "bg-[#10B981]/10 border-r-2 border-[#10B981]" : ""
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{template.name}</span>
                            <span className="text-xs text-gray-500">{template.description}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Font Settings */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-2 px-2">Font Settings</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {renderStyleControl("Name", "name", "nameSize", "nameColor", "nameBold", 20, 48)}
                  {renderStyleControl("Job Title", "title", "titleSize", "titleColor", "titleBold", 12, 24)}
                  {renderStyleControl("Contact Info", "contact", "contactSize", "contactColor", "contactBold", 10, 18)}
                  {renderStyleControl("Section Headers", "header", "headerSize", "headerColor", "headerBold", 14, 24)}
                  {renderStyleControl("Body Text", "body", "bodySize", "bodyColor", "bodyBold", 10, 18)}
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  className="w-full px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 text-sm"
                  onClick={handleSaveDraft}
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0F9A6B] flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow" ref={resumeRef}>
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
