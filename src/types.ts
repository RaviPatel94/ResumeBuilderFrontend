// types/resume.ts

export interface Section {
  id: string;
  title: string;
  content: string | React.ReactNode;
}


export interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
}


export interface ResumeData {
  name: string;
  title: string;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
  sections: Section[];
  skills: String[];
}
