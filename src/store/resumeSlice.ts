// store/resumeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResumeData, Section } from '@/types';

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
}

const initialState: ResumeState = {
  resume: defaultResume
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
    // Optional: Add more granular update actions
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
  },
});

export const { 
  updateResume, 
  deleteSection, 
  duplicateSection, 
  setSkills,
  updateContact,
  updateSection 
} = resumeSlice.actions;
export default resumeSlice.reducer;
