import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Post, Quiz } from '../core/models/models';
import { LanguageService } from '../core/services/language.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'sp-logo',
  standalone: true,
  template: `<a class="brand" routerLink="/" aria-label="Science Pulse home"
    ><span class="brand-mark"><i></i><b>✦</b></span
    ><span>SCIENCE <em>PULSE</em></span></a
  >`,
  imports: [RouterLink],
})
export class LogoComponent {}

@Component({
  selector: 'sp-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent],
  template: ` <header class="nav-shell glass">
    <sp-logo /><button class="menu-btn" (click)="open.set(!open())" [attr.aria-expanded]="open()">
      {{ open() ? '×' : '☰' }}
    </button>
    <nav [class.open]="open()">
      <a routerLink="/news" routerLinkActive="active" (click)="open.set(false)">{{
        l.current() === 'en' ? 'News' : 'სიახლეები'
      }}</a>
      <a routerLink="/news" [queryParams]="{ category: 'space' }" (click)="open.set(false)">{{
        l.current() === 'en' ? 'Space' : 'კოსმოსი'
      }}</a>
      <a routerLink="/news" [queryParams]="{ category: 'technology' }" (click)="open.set(false)">{{
        l.current() === 'en' ? 'Technology' : 'ტექნოლოგია'
      }}</a>
      <a routerLink="/news" [queryParams]="{ category: 'health' }" (click)="open.set(false)">{{
        l.current() === 'en' ? 'Health' : 'ჯანმრთელობა'
      }}</a>
      <a routerLink="/news" [queryParams]="{ category: 'environment' }" (click)="open.set(false)">{{
        l.current() === 'en' ? 'Environment' : 'გარემო'
      }}</a>
      <a routerLink="/quizzes" routerLinkActive="active" (click)="open.set(false)">{{
        l.current() === 'en' ? 'Quizzes' : 'ქვიზები'
      }}</a>
      <a routerLink="/about" routerLinkActive="active" (click)="open.set(false)">{{
        l.current() === 'en' ? 'About' : 'ჩვენ შესახებ'
      }}</a>
      <a routerLink="/contacts" routerLinkActive="active" (click)="open.set(false)">{{
        l.current() === 'en' ? 'Contacts' : 'კონტაქტი'
      }}</a>
    </nav>
    <div class="nav-actions">
      <button class="lang" (click)="l.toggle()">{{ l.current() === 'en' ? 'KA' : 'EN' }}</button>
      @if (auth.canCreate()) {
        <a class="admin-link" routerLink="/admin">{{
          l.current() === 'en' ? 'Studio' : 'სტუდია'
        }}</a>
      }
      @if (auth.currentUser(); as user) {
        <a class="avatar" routerLink="/profile">{{ user.firstName[0] }}{{ user.lastName[0] }}</a>
      } @else {
        <a class="login-link" routerLink="/login">{{
          l.current() === 'en' ? 'Sign in' : 'შესვლა'
        }}</a>
      }
    </div>
  </header>`,
})
export class NavbarComponent {
  open = signal(false);
  constructor(
    public l: LanguageService,
    public auth: AuthService,
  ) {}
}

@Component({
  selector: 'sp-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  template: `<footer>
    <div>
      <sp-logo />
      <p>Ideas that move humanity forward.</p>
    </div>
    <div class="footer-links">
      <a routerLink="/news">Newsroom</a><a routerLink="/quizzes">Quizzes</a
      ><a routerLink="/about">About</a><a routerLink="/contacts">Contact</a>
    </div>
    <small>© 2026 SCIENCE PULSE · Built for curious minds</small>
  </footer>`,
})
export class FooterComponent {}

@Component({
  selector: 'sp-post-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `<article class="post-card glass lift">
    <a class="post-image" [routerLink]="['/post', post.id]"
      ><img [src]="post.image" [alt]="l.text(post.title)" /><span>{{ post.category }}</span></a
    >
    <div class="post-copy">
      <div class="eyebrow">{{ post.createdAt | date: 'MMM d, y' }} · {{ post.author }}</div>
      <h3>
        <a [routerLink]="['/post', post.id]">{{ l.text(post.title) }}</a>
      </h3>
      <p>{{ l.text(post.excerpt) }}</p>
      <a class="text-link" [routerLink]="['/post', post.id]"
        >{{ l.current() === 'en' ? 'Read story' : 'წაიკითხე' }} <b>↗</b></a
      >
    </div>
  </article>`,
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  constructor(public l: LanguageService) {}
}

@Component({
  selector: 'sp-quiz-card',
  standalone: true,
  imports: [RouterLink],
  template: `<article class="quiz-card glass lift">
    <img [src]="quiz.image" [alt]="l.text(quiz.title)" />
    <div>
      <span class="pill"
        >{{ quiz.questions.length }} {{ l.current() === 'en' ? 'questions' : 'კითხვა' }}</span
      >
      <h3>{{ l.text(quiz.title) }}</h3>
      <p>{{ l.text(quiz.description) }}</p>
      <a class="btn small" [routerLink]="['/quiz', quiz.id]"
        >{{ l.current() === 'en' ? 'Start quiz' : 'დაწყება' }} <span>→</span></a
      >
    </div>
  </article>`,
})
export class QuizCardComponent {
  @Input({ required: true }) quiz!: Quiz;
  constructor(public l: LanguageService) {}
}
