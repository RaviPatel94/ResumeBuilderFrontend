// app/templates/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '@/store/projectSlice';
import { projectAPI } from '@/utils/apis';
import { defaultResume } from '@/store/projectSlice';
import ProtectedRoute from '@/components/protectedRoute';

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
    if (creating) return; // Prevent double clicks
    
    setCreating(true);
    try {
      const now = Date.now();
      
      // Create project data
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

      // 1. Save to backend FIRST
      const savedProject = await projectAPI.createProject(newProject);
      
      console.log('Backend response:', savedProject);

      // 2. Load into Redux
      dispatch(setCurrentProject(savedProject));

      // 3. Navigate to editor
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
      // Fetch full project data from backend
      const project = await projectAPI.fetchProject(projectId);
      
      // Load into Redux
      dispatch(setCurrentProject(project));
      
      // Navigate to editor
      router.push('/editor');
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('Failed to load project');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Choose a Template</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div 
            onClick={() => !creating && handleCreateProject('classic')}
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${
              creating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Classic Template</h3>
            <p className="text-gray-600">Traditional and elegant</p>
          </div>
          
          <div 
            onClick={() => !creating && handleCreateProject('modern')}
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${
              creating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Modern Template</h3>
            <p className="text-gray-600">Clean and professional design</p>
          </div>
          
          <div 
            onClick={() => !creating && handleCreateProject('creative')}
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${
              creating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Creative Template</h3>
            <p className="text-gray-600">Bold and unique style</p>
          </div>
        </div>

        {creating && (
          <div className="text-center mb-6">
            <p className="text-gray-600">Creating project...</p>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6">Your Projects</h2>
        {metadata.length === 0 ? (
          <p className="text-gray-600">No projects yet. Create one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metadata.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-2">Template: {project.template}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Updated: {new Date(project.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProject(project.id)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <ProtectedRoute>
      <TemplatesContent />
    </ProtectedRoute>
  );
}