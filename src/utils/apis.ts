// utils/api.ts
const API_URL = 'https://resumebuilderbackend-z2zv.onrender.com/api';

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const projectAPI = {
  // Fetch all project metadata
  fetchMetadata: async () => {
    const response = await fetch(`${API_URL}/projects/metadata`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  },

  // Fetch single project
  fetchProject: async (projectId: string) => {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  },

  // Create project
  createProject: async (project: any) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  },

  // Update project
  updateProject: async (projectId: string, data: any) => {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  },

  // Delete project
  deleteProject: async (projectId: string) => {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result;
  },
};
