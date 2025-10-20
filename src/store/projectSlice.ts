// store/projectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, ResumeData, StyleProps } from '@/types';

const defaultStyles: StyleProps = {
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

const defaultResume: ResumeData = {
  name: "Ravi Patel",
  title: "Frontend Developer",
  contact: {
    email: "ravi.patel@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/ravipatel",
  },
  sections: [
    {
      id: "summary",
      title: "Professional Summary",
      content:
        "Passionate frontend developer with 3+ years of experience building responsive web applications using React, Next.js, and TypeScript. Proven track record of delivering high-quality, user-focused solutions in fast-paced environments.",
    },
    {
      id: "experience",
      title: "Experience",
      content:
        "Frontend Developer Intern at Unschool Technologies (Jan 2023 - Present). Built responsive web applications using React.js and Next.js. Collaborated with design team to implement pixel-perfect UI components. Optimized application performance, reducing load times by 40%.",
    },
    {
      id: "education",
      title: "Education",
      content:
        "B.Tech in Computer Science from Indian Institute of Technology (2020 - 2024). CGPA: 8.5/10",
    },
    {
      id: "projects",
      title: "Projects",
      content:
        "Resume Builder App - Next.js, TypeScript, Tailwind CSS. Interactive resume builder with multiple templates and PDF export functionality. Customer Analytics Dashboard - React, Chart.js, PostgreSQL. Data visualization dashboard for tracking customer metrics and KPIs.",
    },
    {
      id: "skills",
      title: "skills",
      content:
        "Next.js, TypeScript, Tailwind CSS, Website Development",
    },
  ],
};

interface ProjectsState {
  projects: Record<string, Project>;
  currentProjectId: string | null;
  projectOrder: string[];
}

const initialState: ProjectsState = {
  projects: {},
  currentProjectId: null,
  projectOrder: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    createProject(state, action: PayloadAction<{ template: string; name?: string }>) {
      const projectId = `project-${Date.now()}`;
      const now = Date.now();
      
      const newProject: Project = {
        id: projectId,
        name: action.payload.name || "Untitled Resume",
        template: action.payload.template,
        resume: { ...defaultResume },
        styles: { ...defaultStyles },
        createdAt: now,
        updatedAt: now,
      };
      
      state.projects[projectId] = newProject;
      state.projectOrder.unshift(projectId);
      state.currentProjectId = projectId;
    },
    
    setCurrentProject(state, action: PayloadAction<string>) {
      if (state.projects[action.payload]) {
        state.currentProjectId = action.payload;
      }
    },
    
    updateProjectName(state, action: PayloadAction<{ projectId: string; name: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        project.name = action.payload.name;
        project.updatedAt = Date.now();
      }
    },
    
    updateProjectResume(state, action: PayloadAction<{ projectId: string; resume: ResumeData }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        project.resume = action.payload.resume;
        project.updatedAt = Date.now();
      }
    },
    
    updateProjectTemplate(state, action: PayloadAction<{ projectId: string; template: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        project.template = action.payload.template;
        project.updatedAt = Date.now();
      }
    },
    
    updateProjectStyles(state, action: PayloadAction<{ projectId: string; styles: Partial<StyleProps> }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        project.styles = { ...project.styles, ...action.payload.styles };
        project.updatedAt = Date.now();
      }
    },
    
    deleteProject(state, action: PayloadAction<string>) {
      delete state.projects[action.payload];
      state.projectOrder = state.projectOrder.filter(id => id !== action.payload);
      if (state.currentProjectId === action.payload) {
        state.currentProjectId = state.projectOrder[0] || null;
      }
    },
    
    deleteSection(state, action: PayloadAction<{ projectId: string; sectionId: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        project.resume.sections = project.resume.sections.filter(
          section => section.id !== action.payload.sectionId
        );
        project.updatedAt = Date.now();
      }
    },
    
    duplicateSection(state, action: PayloadAction<{ projectId: string; sectionId: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        const section = project.resume.sections.find(
          section => section.id === action.payload.sectionId
        );
        if (section) {
          const newSection = { ...section, id: `${section.id}-${Date.now()}` };
          const index = project.resume.sections.findIndex(
            sec => sec.id === section.id
          );
          project.resume.sections.splice(index + 1, 0, newSection);
          project.updatedAt = Date.now();
        }
      }
    },
    
    updateContact(state, action: PayloadAction<{ projectId: string; field: string; value: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project && project.resume.contact) {
        (project.resume.contact as any)[action.payload.field] = action.payload.value;
        project.updatedAt = Date.now();
      }
    },
    
    updateSection(state, action: PayloadAction<{ projectId: string; id: string; field: 'title' | 'content'; value: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        const section = project.resume.sections.find(s => s.id === action.payload.id);
        if (section) {
          section[action.payload.field] = action.payload.value;
          project.updatedAt = Date.now();
        }
      }
    },
    
    updateSingleStyle(state, action: PayloadAction<{ projectId: string; key: keyof StyleProps; value: string | number | boolean }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        (project.styles as any)[action.payload.key] = action.payload.value;
        project.updatedAt = Date.now();
      }
    },
    
    resetStyles(state, action: PayloadAction<string>) {
      const project = state.projects[action.payload];
      if (project) {
        project.styles = { ...defaultStyles };
        project.updatedAt = Date.now();
      }
    },
    
    moveSectionUp(state, action: PayloadAction<{ projectId: string; sectionId: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        const index = project.resume.sections.findIndex(s => s.id === action.payload.sectionId);
        if (index > 0) {
          const temp = project.resume.sections[index];
          project.resume.sections[index] = project.resume.sections[index - 1];
          project.resume.sections[index - 1] = temp;
          project.updatedAt = Date.now();
        }
      }
    },
    
    moveSectionDown(state, action: PayloadAction<{ projectId: string; sectionId: string }>) {
      const project = state.projects[action.payload.projectId];
      if (project) {
        const index = project.resume.sections.findIndex(s => s.id === action.payload.sectionId);
        if (index < project.resume.sections.length - 1) {
          const temp = project.resume.sections[index];
          project.resume.sections[index] = project.resume.sections[index + 1];
          project.resume.sections[index + 1] = temp;
          project.updatedAt = Date.now();
        }
      }
    },
  },
});

export const {
  createProject,
  setCurrentProject,
  updateProjectName,
  updateProjectResume,
  updateProjectTemplate,
  updateProjectStyles,
  deleteProject,
  deleteSection,
  duplicateSection,
  updateContact,
  updateSection,
  updateSingleStyle,
  resetStyles,
  moveSectionUp,
  moveSectionDown,
} = projectsSlice.actions;

export default projectsSlice.reducer;