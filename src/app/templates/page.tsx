'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '@/store/projectSlice';
import { projectAPI } from '@/utils/apis';
import { defaultResume } from '@/store/projectSlice';
import ProtectedRoute from '@/components/protectedRoute';
import Navbar from '@/components/Navbar';

const defaultStyles = {
  nameSize: 36,
  nameColor: "#000000",
  nameBold: true,
  titleSize: 16,
  titleColor: "#000000",
  titleBold: false,
  contactSize: 12,
  contactColor: "#000000",
  contactBold: false,
  headerSize: 18,
  headerColor: "#000000",
  headerBold: true,
  bodySize: 14,
  bodyColor: "#000000",
  bodyBold: false,
};

function TemplatesContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [metadata, setMetadata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectAPI.fetchMetadata();
      setMetadata(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (template: string) => {
    if (creating) return;
    
    setCreating(true);
    try {
      const now = Date.now();
      
      const newProject = {
        id: `project-${now}`,
        name: `Resume ${new Date().toLocaleDateString()}`,
        template,
        resume: { ...defaultResume },
        styles: { ...defaultStyles },
        createdAt: now,
        updatedAt: now,
      };

      console.log('Creating project:', newProject.id);

      const savedProject = await projectAPI.createProject(newProject);
      
      console.log('Backend response:', savedProject);

      dispatch(setCurrentProject(savedProject));

      router.push('/editor');
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project: ' + (error as Error).message);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectAPI.deleteProject(projectId);
      loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  const handleEditProject = async (projectId: string) => {
    try {
      const project = await projectAPI.fetchProject(projectId);
      
      dispatch(setCurrentProject(project));
      
      router.push('/editor');
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('Failed to load project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
        <div className="min-h-screen bg-white py-8 mt-14 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Your Projects Section - Moved to top */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 pb-4 border-b-2 border-gray-200 gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Projects</h2>
            <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md w-fit">
              {metadata.length} {metadata.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
          
          {metadata.length === 0 ? (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 text-lg">No projects yet. Create your first resume below!</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {metadata.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 md:p-6 hover:bg-gray-50 transition gap-4 ${
                    index !== metadata.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 truncate">{project.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="capitalize">{project.template}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="whitespace-nowrap">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 md:gap-3 flex-shrink-0">
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="flex-1 sm:flex-none px-4 md:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition font-medium text-sm cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 active:bg-gray-100 transition font-medium text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Templates Section */}
        <div>
          <div className="mb-4 md:mb-6 pb-4 border-b-2 border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create New Resume</h1>
            <p className="text-sm md:text-base text-gray-600">Choose a template to get started with your professional resume</p>
          </div>
          
          {creating && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-700 font-medium">Creating your project...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => !creating && handleCreateProject('classic')}
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 ${
                creating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <img 
                  src="/assets/classic.png" 
                  alt="Classic Template Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Classic Template</h3>
                <p className="text-gray-600">Traditional and elegant design for timeless appeal</p>
              </div>
            </div>
            
            <div 
              onClick={() => !creating && handleCreateProject('modern')}
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 ${
                creating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                <img 
                  src="/assets/morden.png" 
                  alt="Modern Template Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Template</h3>
                <p className="text-gray-600">Clean and professional design with contemporary style</p>
              </div>
            </div>
            
            <div 
              onClick={() => !creating && handleCreateProject('creative')}
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 ${
                creating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center">
                <img 
                  src="/assets/creative.png" 
                  alt="Creative Template Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Creative Template</h3>
                <p className="text-gray-600">Bold and unique style to stand out from the crowd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

export default function TemplatesPage() {
  return (
    <ProtectedRoute>
      <TemplatesContent />
    </ProtectedRoute>
  );
}