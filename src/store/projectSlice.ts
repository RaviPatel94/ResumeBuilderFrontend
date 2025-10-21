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

export const defaultResume: ResumeData = {
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
  currentProject: Project | null;
}

const initialState: ProjectsState = {
  currentProject: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Load project from backend
    setCurrentProject(state, action: PayloadAction<Project>) {
      state.currentProject = action.payload;
    },
    
    // Clear current project
    clearCurrentProject(state) {
      state.currentProject = null;
    },
    
    // Update project name
    updateProjectName(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        state.currentProject.name = action.payload;
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Update resume data
    updateProjectResume(state, action: PayloadAction<ResumeData>) {
      if (state.currentProject) {
        state.currentProject.resume = action.payload;
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Update template
    updateProjectTemplate(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        state.currentProject.template = action.payload;
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Update styles
    updateProjectStyles(state, action: PayloadAction<Partial<StyleProps>>) {
      if (state.currentProject) {
        state.currentProject.styles = { ...state.currentProject.styles, ...action.payload };
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Delete section
    deleteSection(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        state.currentProject.resume.sections = state.currentProject.resume.sections.filter(
          section => section.id !== action.payload
        );
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Duplicate section
    duplicateSection(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        const section = state.currentProject.resume.sections.find(
          section => section.id === action.payload
        );
        if (section) {
          const newSection = { ...section, id: `${section.id}-${Date.now()}` };
          const index = state.currentProject.resume.sections.findIndex(
            sec => sec.id === section.id
          );
          state.currentProject.resume.sections.splice(index + 1, 0, newSection);
          state.currentProject.updatedAt = Date.now();
        }
      }
    },
    
    // Update contact
    updateContact(state, action: PayloadAction<{ field: string; value: string }>) {
      if (state.currentProject?.resume.contact) {
        (state.currentProject.resume.contact as any)[action.payload.field] = action.payload.value;
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Update section
    updateSection(state, action: PayloadAction<{ id: string; field: 'title' | 'content'; value: string }>) {
      if (state.currentProject) {
        const section = state.currentProject.resume.sections.find(s => s.id === action.payload.id);
        if (section) {
          section[action.payload.field] = action.payload.value;
          state.currentProject.updatedAt = Date.now();
        }
      }
    },
    
    // Update single style
    updateSingleStyle(state, action: PayloadAction<{ key: keyof StyleProps; value: string | number | boolean }>) {
      if (state.currentProject) {
        (state.currentProject.styles as any)[action.payload.key] = action.payload.value;
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Reset styles
    resetStyles(state) {
      if (state.currentProject) {
        state.currentProject.styles = { ...defaultStyles };
        state.currentProject.updatedAt = Date.now();
      }
    },
    
    // Move section up
    moveSectionUp(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        const index = state.currentProject.resume.sections.findIndex(s => s.id === action.payload);
        if (index > 0) {
          const temp = state.currentProject.resume.sections[index];
          state.currentProject.resume.sections[index] = state.currentProject.resume.sections[index - 1];
          state.currentProject.resume.sections[index - 1] = temp;
          state.currentProject.updatedAt = Date.now();
        }
      }
    },
    
    // Move section down
    moveSectionDown(state, action: PayloadAction<string>) {
      if (state.currentProject) {
        const index = state.currentProject.resume.sections.findIndex(s => s.id === action.payload);
        if (index < state.currentProject.resume.sections.length - 1) {
          const temp = state.currentProject.resume.sections[index];
          state.currentProject.resume.sections[index] = state.currentProject.resume.sections[index + 1];
          state.currentProject.resume.sections[index + 1] = temp;
          state.currentProject.updatedAt = Date.now();
        }
      }
    },
  },
});

export const {
  setCurrentProject,
  clearCurrentProject,
  updateProjectName,
  updateProjectResume,
  updateProjectTemplate,
  updateProjectStyles,
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