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
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
}

export interface Resume {
  name: string;
  title: string;
  contact: Contact;
  sections: Section[];
  skills?: string[];
}

export interface metadata{
  title : string;
  template: string;
}

export interface StyleProps {
  nameSize?: number;
  nameColor?: string;
  nameBold?: boolean;
  titleSize?: number;
  titleColor?: string;
  titleBold?: boolean;
  contactSize?: number;
  contactColor?: string;
  contactBold?: boolean;
  headerSize?: number;
  headerColor?: string;
  headerBold?: boolean;
  bodySize?: number;
  bodyColor?: string;
  bodyBold?: boolean;
}

export interface Project {
  id: string;
  name: string;
  template: string;
  resume: ResumeData;
  styles: StyleProps;
  createdAt: number;
  updatedAt: number;
  thumbnail?: string;
}

export interface ProjectsState {
  projects: Record<string, Project>;
  currentProjectId: string | null;
  projectOrder: string[]; 
}