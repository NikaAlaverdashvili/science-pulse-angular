export type Language = 'en' | 'ka';
export type Role = 'user' | 'creator' | 'admin';
export type Category = 'space' | 'technology' | 'health' | 'environment' | 'physics' | 'research';

export interface Bilingual {
  en: string;
  ka: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
  avatar?: string;
  joinedAt: string;
}
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  avatar?: string;
  text: string;
  createdAt: string;
}
export interface Post {
  id: string;
  title: Bilingual;
  excerpt: Bilingual;
  content: Bilingual;
  category: Category;
  image: string;
  author: string;
  createdAt: string;
  likes: string[];
  dislikes: string[];
}
export interface QuizOption {
  text: Bilingual;
}
export interface QuizQuestion {
  text: Bilingual;
  options: QuizOption[];
  correct: number;
}
export interface Quiz {
  id: string;
  title: Bilingual;
  description: Bilingual;
  image: string;
  questions: QuizQuestion[];
  results: { low: Bilingual; medium: Bilingual; high: Bilingual };
  createdAt: string;
}
