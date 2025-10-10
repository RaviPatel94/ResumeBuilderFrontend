// app/templates/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TemplateCard from "@/components/TemplateCardProps";

const templates = [
  { 
    id: "classic", 
    name: "Classic Professional", 
    thumbnail: "/classic-preview.png",
    description: "Traditional layout perfect for corporate environments"
  },
  { 
    id: "modern", 
    name: "Modern Two-Column", 
    thumbnail: "/modern-preview.png",
    description: "Contemporary design with sidebar layout"
  },
  { 
    id: "creative", 
    name: "Creative Minimalist", 
    thumbnail: "/creative-preview.png",
    description: "Clean, design-forward template with accent colors"
  },
];

const userProjects = [
  { id: "proj1", name: "My Portfolio", thumbnail: "/project1.png" },
  { id: "proj2", name: "Software Engineer Resume", thumbnail: "/project2.png" },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="p-10 max-w-6xl mx-auto bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Resume Template</h1>
          <p className="text-gray-600">Select a template that best represents your professional style</p>
        </div>

        {/* My Projects Section */}
        {userProjects.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {userProjects.map((proj) => (
                <TemplateCard
                  key={proj.id}
                  name={proj.name}
                  thumbnail={proj.thumbnail}
                  onClick={() => router.push(`/editor/project/${proj.id}`)}
                />
              ))}
            </div>
          </>
        )}

        {/* Templates Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resume Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div key={tpl.id} className="group">
              <TemplateCard
                name={tpl.name}
                thumbnail={tpl.thumbnail}
                onClick={() => router.push(`/editor/${tpl.id}`)}
              />
              <p className="text-sm text-gray-500 mt-2 text-center">{tpl.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
