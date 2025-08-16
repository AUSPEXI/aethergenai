export interface NavigationItem {
  name: string;
  path: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  impact?: string;
}

export interface CreativeWork {
  id: string;
  title: string;
  type: 'poem' | 'artwork' | 'essay';
  content: string;
  analysis?: string;
  themes: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject?: string;
}