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
  
  // Style controls
  const [nameSize, setNameSize] = useState(36);
  const [nameColor, setNameColor] = useState("#000000");
  const [nameBold, setNameBold] = useState(true);
  
  const [titleSize, setTitleSize] = useState(16);
  const [titleColor, setTitleColor] = useState("#000000");
  const [titleBold, setTitleBold] = useState(false);
  
  const [contactSize, setContactSize] = useState(12);
  const [contactColor, setContactColor] = useState("#000000");
  const [contactBold, setContactBold] = useState(false);
  
  const [headerSize, setHeaderSize] = useState(18);
  const [headerColor, setHeaderColor] = useState("#000000");
  const [headerBold, setHeaderBold] = useState(true);
  
  const [bodySize, setBodySize] = useState(14);
  const [bodyColor, setBodyColor] = useState("#000000");
  const [bodyBold, setBodyBold] = useState(false);
  
  const dispatch = useDispatch();
  const resume = useSelector((state: RootState) => state.resume.resume);

  useEffect(() => {
    if (params?.templateId) setCurrentTemplate(params.templateId as string);
  }, [params]);

  const renderTemplate = () => {
    const styleProps = {
      nameSize,
      nameColor,
      nameBold,
      titleSize,
      titleColor,
      titleBold,
      contactSize,
      contactColor,
      contactBold,
      headerSize,
      headerColor,
      headerBold,
      bodySize,
      bodyColor,
      bodyBold,
    };

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
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Left Panel - Controls */}
          <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Template Selector */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Template</h2>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
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
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
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
              </div>

              {/* Font Settings */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Font Settings</h2>
                
                {/* Name Settings */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Name</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Size (px)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={nameSize}
                          onChange={(e) => setNameSize(Number(e.target.value))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                          min="20"
                          max="48"
                        />
                        <input
                          type="range"
                          value={nameSize}
                          onChange={(e) => setNameSize(Number(e.target.value))}
                          className="flex-1"
                          min="20"
                          max="48"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Colour</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={nameColor}
                          onChange={(e) => setNameColor(e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={nameColor}
                          onChange={(e) => setNameColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="nameBold"
                        checked={nameBold}
                        onChange={(e) => setNameBold(e.target.checked)}
                        className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
                      />
                      <label htmlFor="nameBold" className="ml-2 text-sm text-gray-600">Bold</label>
                    </div>
                  </div>
                </div>

                {/* Title Settings */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Job Title</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Size (px)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={titleSize}
                          onChange={(e) => setTitleSize(Number(e.target.value))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                          min="12"
                          max="24"
                        />
                        <input
                          type="range"
                          value={titleSize}
                          onChange={(e) => setTitleSize(Number(e.target.value))}
                          className="flex-1"
                          min="12"
                          max="24"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Colour</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={titleColor}
                          onChange={(e) => setTitleColor(e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={titleColor}
                          onChange={(e) => setTitleColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="titleBold"
                        checked={titleBold}
                        onChange={(e) => setTitleBold(e.target.checked)}
                        className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
                      />
                      <label htmlFor="titleBold" className="ml-2 text-sm text-gray-600">Bold</label>
                    </div>
                  </div>
                </div>

                {/* Contact Settings */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Contact Info</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Size (px)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={contactSize}
                          onChange={(e) => setContactSize(Number(e.target.value))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                          min="10"
                          max="18"
                        />
                        <input
                          type="range"
                          value={contactSize}
                          onChange={(e) => setContactSize(Number(e.target.value))}
                          className="flex-1"
                          min="10"
                          max="18"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Colour</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={contactColor}
                          onChange={(e) => setContactColor(e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={contactColor}
                          onChange={(e) => setContactColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="contactBold"
                        checked={contactBold}
                        onChange={(e) => setContactBold(e.target.checked)}
                        className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
                      />
                      <label htmlFor="contactBold" className="ml-2 text-sm text-gray-600">Bold</label>
                    </div>
                  </div>
                </div>

                {/* Section Headers Settings */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Section Headers</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Size (px)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={headerSize}
                          onChange={(e) => setHeaderSize(Number(e.target.value))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                          min="14"
                          max="24"
                        />
                        <input
                          type="range"
                          value={headerSize}
                          onChange={(e) => setHeaderSize(Number(e.target.value))}
                          className="flex-1"
                          min="14"
                          max="24"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Colour</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={headerColor}
                          onChange={(e) => setHeaderColor(e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={headerColor}
                          onChange={(e) => setHeaderColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="headerBold"
                        checked={headerBold}
                        onChange={(e) => setHeaderBold(e.target.checked)}
                        className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
                      />
                      <label htmlFor="headerBold" className="ml-2 text-sm text-gray-600">Bold</label>
                    </div>
                  </div>
                </div>

                {/* Body Settings */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Body Text</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Size (px)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={bodySize}
                          onChange={(e) => setBodySize(Number(e.target.value))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                          min="10"
                          max="18"
                        />
                        <input
                          type="range"
                          value={bodySize}
                          onChange={(e) => setBodySize(Number(e.target.value))}
                          className="flex-1"
                          min="10"
                          max="18"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Colour</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={bodyColor}
                          onChange={(e) => setBodyColor(e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={bodyColor}
                          onChange={(e) => setBodyColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="bodyBold"
                        checked={bodyBold}
                        onChange={(e) => setBodyBold(e.target.checked)}
                        className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
                      />
                      <label htmlFor="bodyBold" className="ml-2 text-sm text-gray-600">Bold</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <button
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </button>
                <button className="w-full px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0F9A6B] transition font-medium">
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
              <div key={`${currentTemplate}-${nameSize}-${nameColor}-${nameBold}-${titleSize}-${titleColor}-${titleBold}-${contactSize}-${contactColor}-${contactBold}-${headerSize}-${headerColor}-${headerBold}-${bodySize}-${bodyColor}-${bodyBold}`}>
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}