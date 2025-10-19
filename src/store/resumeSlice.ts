// store/resumeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResumeData, Section } from '@/types';

// Define style types
export interface StyleSettings {
  nameSize: number;
  nameColor: string;
  nameBold: boolean;
  titleSize: number;
  titleColor: string;
  titleBold: boolean;
  contactSize: number;
  contactColor: string;
  contactBold: boolean;
  headerSize: number;
  headerColor: string;
  headerBold: boolean;
  bodySize: number;
  bodyColor: string;
  bodyBold: boolean;
}

const defaultStyles: StyleSettings = {
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
  ],
  skills: ["Java", "Node.js", "Website Development"],
};

interface ResumeState {
  resume: ResumeData;
  currentTemplate: string;
  styles: StyleSettings;
}

const initialState: ResumeState = {
  resume: defaultResume,
  currentTemplate: "classic",
  styles: defaultStyles,
}

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateResume(state, action: PayloadAction<ResumeData>) {
      state.resume = action.payload;
    },
    deleteSection(state, action: PayloadAction<string>) {
      state.resume.sections = state.resume.sections.filter(
        section => section.id !== action.payload
      );
    },
    duplicateSection(state, action: PayloadAction<string>) {
      const section = state.resume.sections.find(
        section => section.id === action.payload
      );
      if (section) {
        const newSection = { ...section, id: `${section.id}-${Date.now()}` };
        const index = state.resume.sections.findIndex(
          sec => sec.id === section.id
        );
        state.resume.sections.splice(index + 1, 0, newSection);
      }
    },
    setSkills(state, action: PayloadAction<string[]>) {
      state.resume.skills = action.payload;
    },
    updateContact(state, action: PayloadAction<{ field: keyof ResumeData['contact']; value: string }>) {
      if (state.resume.contact) {
        (state.resume.contact as any)[action.payload.field] = action.payload.value;
      }
    },
    updateSection(state, action: PayloadAction<{ id: string; field: 'title' | 'content'; value: string }>) {
      const section = state.resume.sections.find(s => s.id === action.payload.id);
      if (section) {
        section[action.payload.field] = action.payload.value;
      }
    },
    setTemplate(state, action: PayloadAction<string>) {
      state.currentTemplate = action.payload;
    },
    updateStyles(state, action: PayloadAction<Partial<StyleSettings>>) {
      state.styles = { ...state.styles, ...action.payload };
    },
    updateSingleStyle(state, action: PayloadAction<{ key: keyof StyleSettings; value: string | number | boolean }>) {
      (state.styles as any)[action.payload.key] = action.payload.value;
    },
    resetStyles(state) {
      state.styles = defaultStyles;
    },
  },
});

export const { 
  updateResume, 
  deleteSection, 
  duplicateSection, 
  setSkills,
  updateContact,
  updateSection,
  setTemplate,
  updateStyles,
  updateSingleStyle,
  resetStyles,
} = resumeSlice.actions;

export default resumeSlice.reducer;