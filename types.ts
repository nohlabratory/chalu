export type Page = 'home' | 'about' | 'classes' | 'services' | 'resources' | 'contact' | 'admin';

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  date: string;
  fontFamily?: string;
}