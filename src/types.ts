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