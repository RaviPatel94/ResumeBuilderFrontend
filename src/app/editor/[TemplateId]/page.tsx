"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ClassicTemplate from "@/components/Templates/ClassicTemplate";
import ModernTemplate from "@/components/Templates/ModernTemplate";
import CreativeTemplate from "@/components/Templates/CreativeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { updateResume } from "@/store/resumeSlice";
import { RootState } from "@/store/store";

export default function EditorPage() {
  const params = useParams();
  const [currentTemplate, setCurrentTemplate] = useState<string>("classic");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const resume = useSelector((state: RootState) => state.resume.resume);

  useEffect(() => {
    if (params?.templateId) setCurrentTemplate(params.templateId as string);
  }, [params]);

  const renderTemplate = () => {
    switch (currentTemplate) {
      case "modern":
        return <ModernTemplate />;
      case "creative":
        return <CreativeTemplate />;
      case "classic":
      default:
        return <ClassicTemplate />;
    }
  };

  const handleSaveDraft = () => {
    dispatch(updateResume({ ...resume }));
  };

  const templates = [
    { id: "classic", name: "Classic Professional", description: "Traditional black & white formal layout" },
    { id: "modern", name: "Modern Minimalist", description: "Clean layout" },
    { id: "creative", name: "Creative Two-Column", description: "Colorful layout" }
  ];
  const currentTemplateInfo = templates.find(t => t.id === currentTemplate);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-64 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-gray-900">{currentTemplateInfo?.name}</span>
                  <span className="text-xs text-gray-500">{currentTemplateInfo?.description}</span>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-64 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setCurrentTemplate(template.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        currentTemplate === template.id ? 'bg-[#10B981]/10 border-r-2 border-[#10B981]' : ''
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{template.name}</span>
                        <span className="text-xs text-gray-500">{template.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                onClick={handleSaveDraft}
              >
                Save Draft
              </button>
              <button className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0F9A6B] transition">
                Download PDF
              </button>
            </div>
          </div>
          <div key={currentTemplate}>{renderTemplate()}</div>
        </div>
      </div>
    </>
  );
}
