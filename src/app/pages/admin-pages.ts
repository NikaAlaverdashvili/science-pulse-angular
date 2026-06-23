import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { LanguageService } from '../core/services/language.service';
import { PostService } from '../core/services/post.service';
import { QuizService } from '../core/services/quiz.service';
import { Bilingual, Category, QuizQuestion } from '../core/models/models';

@Component({
  selector: 'sp-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<section class="admin-page container">
    <div class="admin-title">
      <div>
        <span class="kicker"><i></i>SCIENCE PULSE STUDIO</span>
        <h1>{{ l.current() === 'en' ? 'Mission control' : 'მართვის ცენტრი' }}</h1>
        <p>
          {{ l.current() === 'en' ? 'Good to see you,' : 'კეთილი დაბრუნება,' }}
          {{ auth.currentUser()?.firstName }}.
        </p>
      </div>
      <div class="live"><i></i>{{ l.current() === 'en' ? 'SYSTEM ONLINE' : 'სისტემა ონლაინ' }}</div>
    </div>
    <div class="stats-grid">
      <article class="glass">
        <span>◫</span>
        <div>
          <b>{{ posts.posts().length }}</b
          ><small>{{ l.current() === 'en' ? 'Published stories' : 'გამოქვეყნებული ამბავი' }}</small>
        </div>
        <em>+12%</em>
      </article>
      <article class="glass">
        <span>◇</span>
        <div>
          <b>{{ quizzes.quizzes().length }}</b
          ><small>{{ l.current() === 'en' ? 'Active quizzes' : 'აქტიური ქვიზი' }}</small>
        </div>
        <em>Live</em>
      </article>
      <article class="glass">
        <span>◎</span>
        <div>
          <b>{{ auth.users().length }}</b
          ><small>{{ l.current() === 'en' ? 'Community members' : 'მომხმარებელი' }}</small>
        </div>
        <em>+{{ auth.users().length - 1 }}</em>
      </article>
      <article class="glass">
        <span>◌</span>
        <div>
          <b>{{ posts.comments().length }}</b
          ><small>{{ l.current() === 'en' ? 'Conversations' : 'კომენტარი' }}</small>
        </div>
        <em>Open</em>
      </article>
    </div>
    <div class="admin-actions">
      <a class="glass lift" routerLink="/admin/create-post"
        ><i>＋</i
        ><span
          ><b>{{ l.current() === 'en' ? 'Create a story' : 'შექმენი სტატია' }}</b
          ><small>{{
            l.current() === 'en' ? 'Publish a bilingual discovery' : 'გამოაქვეყნე ორენოვანი ამბავი'
          }}</small></span
        ><em>→</em></a
      ><a class="glass lift" routerLink="/admin/create-quiz"
        ><i>?</i
        ><span
          ><b>{{ l.current() === 'en' ? 'Build a quiz' : 'შექმენი ქვიზი' }}</b
          ><small>{{
            l.current() === 'en' ? 'Make learning interactive' : 'გახადე სწავლა ინტერაქტიული'
          }}</small></span
        ><em>→</em></a
      >
      @if (auth.isAdmin()) {
        <a class="glass lift" routerLink="/admin/users"
          ><i>◎</i
          ><span
            ><b>{{ l.current() === 'en' ? 'Manage people' : 'მომხმარებლები' }}</b
            ><small>{{
              l.current() === 'en' ? 'Roles and permissions' : 'როლები და უფლებები'
            }}</small></span
          ><em>→</em></a
        >
      }
    </div>
    <div class="dashboard-grid">
      <section class="glass panel">
        <div class="panel-head">
          <h2>{{ l.current() === 'en' ? 'Recent transmissions' : 'ბოლო პუბლიკაციები' }}</h2>
          <a routerLink="/news">{{ l.current() === 'en' ? 'View all' : 'ყველა' }} ↗</a>
        </div>
        @for (p of posts.posts().slice(0, 4); track p.id) {
          <a class="recent-row" [routerLink]="['/post', p.id]"
            ><img [src]="p.image" /><span
              ><small>{{ p.category }} · {{ p.createdAt | date: 'MMM d' }}</small
              ><b>{{ l.text(p.title) }}</b></span
            ><em>↗</em></a
          >
        }
      </section>
      <section class="glass panel">
        <div class="panel-head">
          <h2>{{ l.current() === 'en' ? 'Recent comments' : 'ბოლო კომენტარები' }}</h2>
        </div>
        @for (c of posts.comments().slice(-4).reverse(); track c.id) {
          <div class="recent-comment">
            <span class="avatar">{{ c.userName[0] }}</span>
            <div>
              <b>{{ c.userName }}</b>
              <p>{{ c.text }}</p>
              <small>{{ c.createdAt | date: 'short' }}</small>
            </div>
            @if (auth.isAdmin()) {
              <button class="icon-btn danger" (click)="posts.deleteComment(c.id)">×</button>
            }
          </div>
        } @empty {
          <div class="empty-mini">
            ✦
            <p>{{ l.current() === 'en' ? 'Quiet for now.' : 'ჯერ სიმშვიდეა.' }}</p>
          </div>
        }
      </section>
    </div>
  </section>`,
})
export class AdminPage {
  constructor(
    public l: LanguageService,
    public auth: AuthService,
    public posts: PostService,
    public quizzes: QuizService,
  ) {}
}

@Component({
  selector: 'sp-create-post',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `<section class="editor-page container">
    <a class="back" routerLink="/admin"
      >← {{ l.current() === 'en' ? 'Mission control' : 'მართვის ცენტრი' }}</a
    >
    <div class="editor-head">
      <div>
        <span class="kicker"
          ><i></i>{{ l.current() === 'en' ? 'NEW TRANSMISSION' : 'ახალი პუბლიკაცია' }}</span
        >
        <h1>{{ l.current() === 'en' ? 'Create a story' : 'შექმენი სტატია' }}</h1>
      </div>
      <span class="draft">● {{ l.current() === 'en' ? 'Local draft' : 'ლოკალური მონახაზი' }}</span>
    </div>
    <form class="editor-grid" (ngSubmit)="publish()" #f="ngForm">
      <div class="editor-main">
        <section class="glass form-section">
          <h2><span>01</span>{{ l.current() === 'en' ? 'Cover image' : 'მთავარი ფოტო' }}</h2>
          <div
            class="image-drop"
            (click)="file.click()"
            [style.backgroundImage]="image ? 'url(' + image + ')' : ''"
          >
            @if (!image) {
              <i>＋</i><b>{{ l.current() === 'en' ? 'Choose an image' : 'აირჩიე ფოტო' }}</b
              ><small>PNG, JPG · Base64 preview</small>
            }
            <input #file hidden type="file" accept="image/*" (change)="readImage($event)" />
          </div>
        </section>
        <section class="glass form-section">
          <h2>
            <span>02</span>{{ l.current() === 'en' ? 'Bilingual story' : 'ორენოვანი სტატია' }}
          </h2>
          <div class="language-tabs">
            <button type="button" [class.active]="tab === 'en'" (click)="tab = 'en'">ENGLISH</button
            ><button type="button" [class.active]="tab === 'ka'" (click)="tab = 'ka'">
              ქართული
            </button>
          </div>
          <div [hidden]="tab !== 'en'">
            <label>Title<input name="titleEn" [(ngModel)]="title.en" required /></label
            ><label
              >Short description<textarea
                name="excerptEn"
                [(ngModel)]="excerpt.en"
                required
                rows="3"
              ></textarea></label
            ><label
              >Full article<textarea
                name="contentEn"
                [(ngModel)]="content.en"
                required
                rows="12"
              ></textarea>
            </label>
          </div>
          <div [hidden]="tab !== 'ka'">
            <label>სათაური<input name="titleKa" [(ngModel)]="title.ka" required /></label
            ><label
              >მოკლე აღწერა<textarea
                name="excerptKa"
                [(ngModel)]="excerpt.ka"
                required
                rows="3"
              ></textarea></label
            ><label
              >სრული სტატია<textarea
                name="contentKa"
                [(ngModel)]="content.ka"
                required
                rows="12"
              ></textarea>
            </label>
          </div>
        </section>
      </div>
      <aside>
        <section class="glass form-section sticky">
          <h2><span>03</span>{{ l.current() === 'en' ? 'Publish settings' : 'გამოქვეყნება' }}</h2>
          <label
            >{{ l.current() === 'en' ? 'Category' : 'კატეგორია'
            }}<select name="category" [(ngModel)]="category" required>
              <option value="space">Space</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="environment">Environment</option>
              <option value="physics">Physics</option>
              <option value="research">Research</option>
            </select></label
          >
          <div class="publish-check">
            <span>✓</span>
            <p>
              <b>{{ l.current() === 'en' ? 'Ready when you are' : 'ყველაფერი მზადაა' }}</b
              ><small>{{
                l.current() === 'en'
                  ? 'Saved in your local demo database.'
                  : 'შეინახება ლოკალურ დემო ბაზაში.'
              }}</small>
            </p>
          </div>
          <button class="btn wide" [disabled]="f.invalid">
            {{ l.current() === 'en' ? 'Publish story' : 'სტატიის გამოქვეყნება' }} →
          </button>
        </section>
      </aside>
    </form>
  </section>`,
})
export class CreatePostPage {
  tab: 'en' | 'ka' = 'en';
  image = '';
  title: Bilingual = { en: '', ka: '' };
  excerpt: Bilingual = { en: '', ka: '' };
  content: Bilingual = { en: '', ka: '' };
  category: Category = 'space';
  constructor(
    public l: LanguageService,
    private posts: PostService,
    private auth: AuthService,
    private router: Router,
  ) {}
  readImage(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) {
      const r = new FileReader();
      r.onload = () => (this.image = r.result as string);
      r.readAsDataURL(f);
    }
  }
  publish() {
    this.posts.add({
      id: crypto.randomUUID(),
      title: { ...this.title },
      excerpt: { ...this.excerpt },
      content: { ...this.content },
      category: this.category,
      image: this.image || '/assets/earth-hero.png',
      author: `${this.auth.currentUser()!.firstName} ${this.auth.currentUser()!.lastName}`,
      createdAt: new Date().toISOString(),
      likes: [],
      dislikes: [],
    });
    this.router.navigate(['/news']);
  }
}

@Component({
  selector: 'sp-create-quiz',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `<section class="editor-page container">
    <a class="back" routerLink="/admin"
      >← {{ l.current() === 'en' ? 'Mission control' : 'მართვის ცენტრი' }}</a
    >
    <div class="editor-head">
      <div>
        <span class="kicker"
          ><i></i>{{ l.current() === 'en' ? 'INTERACTIVE LAB' : 'ინტერაქტიული ლაბორატორია' }}</span
        >
        <h1>{{ l.current() === 'en' ? 'Build a quiz' : 'შექმენი ქვიზი' }}</h1>
      </div>
    </div>
    <form (ngSubmit)="publish()" #f="ngForm">
      <section class="glass form-section">
        <div class="form-row-head">
          <h2><span>01</span>{{ l.current() === 'en' ? 'Quiz identity' : 'ქვიზის ინფორმაცია' }}</h2>
          <button type="button" class="lang" (click)="tab = tab === 'en' ? 'ka' : 'en'">
            {{ tab === 'en' ? 'KA' : 'EN' }}
          </button>
        </div>
        <div class="two-cols">
          <div>
            <label
              >{{ tab === 'en' ? 'English title' : 'ქართული სათაური'
              }}<input name="title" [(ngModel)]="title[tab]" required /></label
            ><label
              >{{ tab === 'en' ? 'English description' : 'ქართული აღწერა'
              }}<textarea name="description" [(ngModel)]="description[tab]" required></textarea>
            </label>
          </div>
          <div
            class="image-drop compact-drop"
            (click)="file.click()"
            [style.backgroundImage]="image ? 'url(' + image + ')' : ''"
          >
            @if (!image) {
              <i>＋</i><b>{{ l.current() === 'en' ? 'Quiz cover' : 'ქვიზის ფოტო' }}</b>
            }
            <input #file hidden type="file" accept="image/*" (change)="readImage($event)" />
          </div>
        </div>
      </section>
      <section class="questions-builder">
        <div class="section-head">
          <h2>
            {{ l.current() === 'en' ? 'Questions' : 'კითხვები' }} <sup>{{ questions.length }}</sup>
          </h2>
          <button type="button" class="btn small" (click)="addQuestion()">
            ＋ {{ l.current() === 'en' ? 'Add question' : 'კითხვა' }}
          </button>
        </div>
        @for (q of questions; track $index; let qi = $index) {
          <article class="glass form-section question-block">
            <div class="question-number">0{{ qi + 1 }}</div>
            <button type="button" class="icon-btn danger remove" (click)="removeQuestion(qi)">
              ×</button
            ><label
              >{{ tab === 'en' ? 'Question in English' : 'კითხვა ქართულად'
              }}<input [name]="'q' + qi + tab" [(ngModel)]="q.text[tab]" required
            /></label>
            <div class="answer-grid">
              @for (o of q.options; track $index; let oi = $index) {
                <label class="answer-option" [class.correct]="q.correct === oi"
                  ><button type="button" (click)="q.correct = oi">
                    {{ q.correct === oi ? '✓' : '○' }}</button
                  ><input
                    [name]="'q' + qi + 'o' + oi + tab"
                    [(ngModel)]="o.text[tab]"
                    [placeholder]="(tab === 'en' ? 'Answer ' : 'პასუხი ') + (oi + 1)"
                    required
                /></label>
              }
            </div>
          </article>
        }
      </section>
      <section class="glass form-section">
        <h2><span>03</span>{{ l.current() === 'en' ? 'Result messages' : 'შედეგის ტექსტები' }}</h2>
        <div class="three-cols">
          <label>0–49%<input name="low" [(ngModel)]="results.low[tab]" required /></label
          ><label>50–79%<input name="medium" [(ngModel)]="results.medium[tab]" required /></label
          ><label>80–100%<input name="high" [(ngModel)]="results.high[tab]" required /></label>
        </div>
        <button class="btn" [disabled]="f.invalid || !questions.length">
          {{ l.current() === 'en' ? 'Publish quiz' : 'ქვიზის გამოქვეყნება' }} →
        </button>
      </section>
    </form>
  </section>`,
})
export class CreateQuizPage {
  tab: 'en' | 'ka' = 'en';
  image = '';
  title: Bilingual = { en: '', ka: '' };
  description: Bilingual = { en: '', ka: '' };
  results = {
    low: { en: 'Keep exploring!', ka: 'განაგრძე ძიება!' },
    medium: { en: 'Great result!', ka: 'შესანიშნავი შედეგი!' },
    high: { en: 'Science master!', ka: 'მეცნიერების ოსტატი!' },
  };
  questions: QuizQuestion[] = [];
  constructor(
    public l: LanguageService,
    private quizzes: QuizService,
    private router: Router,
  ) {
    this.addQuestion();
  }
  blank(): QuizQuestion {
    return {
      text: { en: '', ka: '' },
      options: Array.from({ length: 4 }, () => ({ text: { en: '', ka: '' } })),
      correct: 0,
    };
  }
  addQuestion() {
    this.questions.push(this.blank());
  }
  removeQuestion(i: number) {
    if (this.questions.length > 1) this.questions.splice(i, 1);
  }
  readImage(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) {
      const r = new FileReader();
      r.onload = () => (this.image = r.result as string);
      r.readAsDataURL(f);
    }
  }
  publish() {
    this.quizzes.add({
      id: crypto.randomUUID(),
      title: { ...this.title },
      description: { ...this.description },
      image: this.image || '/assets/earth-hero.png',
      questions: this.questions,
      results: this.results,
      createdAt: new Date().toISOString(),
    });
    this.router.navigate(['/quizzes']);
  }
}

@Component({
  selector: 'sp-manage-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<section class="admin-page container">
    <a class="back" routerLink="/admin"
      >← {{ l.current() === 'en' ? 'Mission control' : 'მართვის ცენტრი' }}</a
    >
    <div class="admin-title">
      <div>
        <span class="kicker"
          ><i></i>{{ l.current() === 'en' ? 'ACCESS CONTROL' : 'წვდომის მართვა' }}</span
        >
        <h1>{{ l.current() === 'en' ? 'People & permissions' : 'მომხმარებლები და უფლებები' }}</h1>
        <p>
          {{
            l.current() === 'en'
              ? 'Choose who can publish to Science Pulse.'
              : 'აირჩიე, ვის შეუძლია Science Pulse-ზე გამოქვეყნება.'
          }}
        </p>
      </div>
    </div>
    <section class="glass users-table">
      <div class="table-head">
        <span>{{ l.current() === 'en' ? 'Member' : 'მომხმარებელი' }}</span
        ><span>{{ l.current() === 'en' ? 'Joined' : 'რეგისტრაცია' }}</span
        ><span>{{ l.current() === 'en' ? 'Role' : 'როლი' }}</span
        ><span>{{ l.current() === 'en' ? 'Permission' : 'უფლება' }}</span>
      </div>
      @for (u of auth.users(); track u.id) {
        <div class="user-row">
          <span class="user-cell"
            ><i class="avatar">{{ u.firstName[0] }}{{ u.lastName[0] }}</i
            ><b>{{ u.firstName }} {{ u.lastName }}</b></span
          ><span>{{ u.joinedAt | date: 'mediumDate' }}</span
          ><span
            ><em
              class="role"
              [class.admin]="u.role === 'admin'"
              [class.creator]="u.role === 'creator'"
              >{{ u.role }}</em
            ></span
          ><span>
            @if (u.role === 'admin') {
              <small class="protected">◆ {{ l.current() === 'en' ? 'Protected' : 'დაცული' }}</small>
            } @else if (u.role === 'creator') {
              <button class="btn ghost small" (click)="auth.setRole(u.id, 'user')">
                {{ l.current() === 'en' ? 'Remove creator' : 'უფლების წაშლა' }}
              </button>
            } @else {
              <button class="btn small" (click)="auth.setRole(u.id, 'creator')">
                {{ l.current() === 'en' ? 'Make creator' : 'გახადე ავტორი' }}
              </button>
            }
          </span>
        </div>
      }
    </section>
  </section>`,
})
export class ManageUsersPage {
  constructor(
    public l: LanguageService,
    public auth: AuthService,
  ) {}
}
