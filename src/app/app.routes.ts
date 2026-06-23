import { Routes } from '@angular/router';
import {
  AboutPage,
  ContactsPage,
  HomePage,
  LoginPage,
  NewsPage,
  PostDetailsPage,
  ProfilePage,
  QuizDetailsPage,
  QuizzesPage,
  RegisterPage,
} from './pages/public-pages';
import { AdminPage, CreatePostPage, CreateQuizPage, ManageUsersPage } from './pages/admin-pages';
import { adminGuard, authGuard, creatorGuard } from './core/guards/guards';
export const routes: Routes = [
  { path: '', component: HomePage, title: 'SCIENCE PULSE — Ideas that move humanity' },
  { path: 'news', component: NewsPage, title: 'Newsroom — SCIENCE PULSE' },
  { path: 'post/:id', component: PostDetailsPage, title: 'Story — SCIENCE PULSE' },
  { path: 'quizzes', component: QuizzesPage, title: 'Quizzes — SCIENCE PULSE' },
  { path: 'quiz/:id', component: QuizDetailsPage, title: 'Quiz — SCIENCE PULSE' },
  { path: 'about', component: AboutPage, title: 'About — SCIENCE PULSE' },
  { path: 'contacts', component: ContactsPage, title: 'Contact — SCIENCE PULSE' },
  { path: 'login', component: LoginPage, title: 'Sign in — SCIENCE PULSE' },
  { path: 'register', component: RegisterPage, title: 'Register — SCIENCE PULSE' },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [authGuard],
    title: 'Profile — SCIENCE PULSE',
  },
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [creatorGuard],
    title: 'Studio — SCIENCE PULSE',
  },
  {
    path: 'admin/create-post',
    component: CreatePostPage,
    canActivate: [creatorGuard],
    title: 'Create story — SCIENCE PULSE',
  },
  {
    path: 'admin/create-quiz',
    component: CreateQuizPage,
    canActivate: [creatorGuard],
    title: 'Create quiz — SCIENCE PULSE',
  },
  {
    path: 'admin/users',
    component: ManageUsersPage,
    canActivate: [adminGuard],
    title: 'People — SCIENCE PULSE',
  },
  { path: '**', redirectTo: '' },
];
