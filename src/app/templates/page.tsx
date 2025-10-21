"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentProject, deleteProject, createProject } from "@/store/projectSlice";
import Navbar from "@/components/Navbar";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";

const templates = [
  { 
    id: "classic", 
    name: "Classic Professional", 
    thumbnail: "/assets/classic.png",
    description: "Traditional layout perfect for corporate environments"
  },
  { 
    id: "modern", 
    name: "Modern Two-Column", 
    thumbnail: "/assets/morden.png",
    description: "Contemporary design with sidebar layout"
  },
  { 
    id: "creative", 
    name: "Creative Minimalist", 
    thumbnail: "/assets/creative.png",
    description: "Clean, design-forward template with accent colors"
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const projects = useSelector((state: RootState) => state.projects.projects);
  const projectOrder = useSelector((state: RootState) => state.projects.projectOrder);

  // Debug: Log the state
  useEffect(() => {
    console.log("Projects:", projects);
    console.log("Project Order:", projectOrder);
  }, [projects, projectOrder]);

  const userProjects = projectOrder.map(id => projects[id]).filter(Boolean);

  const handleProjectClick = (projectId: string) => {
    const project = projects[projectId];
    if (project) {
      dispatch(setCurrentProject(projectId));
      // Small delay to ensure state is updated
      setTimeout(() => {
        router.push(`/editor/${project.template}`);
      }, 100);
    }
  };

  const handleTemplateClick = (templateId: string) => {
    // Create new project
    dispatch(createProject({ template: templateId, name: "My Resume" }));
    
    // Wait for Redux to update, then navigate
    setTimeout(() => {
      router.push(`/editor/${templateId}`);
    }, 100);
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(projectId));
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-10 pt-24 max-w-6xl mx-auto bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Resume Template</h1>
          <p className="text-gray-600">Select a template that best represents your professional style</p>
        </div>

        {/* My Projects Section */}
        {userProjects.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Projects ({userProjects.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {userProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleProjectClick(proj.id)}
                  className="cursor-pointer rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition p-4 flex flex-col items-center relative group"
                >
                  <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-400">
                    {proj.thumbnail ? (
                      <img src={proj.thumbnail} alt={proj.name} className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <span className="text-sm">Resume Preview</span>
                    )}
                  </div>
                  <h2 className="font-semibold text-black text-lg">{proj.name}</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {templates.find(t => t.id === proj.template)?.name || proj.template}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Updated {new Date(proj.updatedAt).toLocaleDateString()}
                  </p>
                  
                  <button
                    onClick={(e) => handleDeleteProject(e, proj.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Templates Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resume Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div key={tpl.id} className="group">
              <div
                onClick={() => handleTemplateClick(tpl.id)}
                className="cursor-pointer rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition p-4 flex flex-col items-center"
              >
                <img src={tpl.thumbnail} alt={tpl.name} className="rounded-md mb-3 w-full top-0 h-62 object-cover object-top" />
                <h2 className="font-semibold text-black text-lg">{tpl.name}</h2>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">{tpl.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}