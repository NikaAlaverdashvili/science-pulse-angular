import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { LanguageService } from '../core/services/language.service';
import { PostService } from '../core/services/post.service';
import { QuizService } from '../core/services/quiz.service';
import { Category, Comment, User } from '../core/models/models';
import { PostCardComponent, QuizCardComponent } from '../shared/components';

const categories: {
  id: Category;
  icon: string;
  en: string;
  ka: string;
  descEn: string;
  descKa: string;
}[] = [
  {
    id: 'space',
    icon: '◌',
    en: 'Space',
    ka: 'კოსმოსი',
    descEn: 'Beyond our world',
    descKa: 'ჩვენი სამყაროს მიღმა',
  },
  {
    id: 'technology',
    icon: '⌘',
    en: 'Technology',
    ka: 'ტექნოლოგია',
    descEn: 'Ideas shaping tomorrow',
    descKa: 'ხვალინდელი იდეები',
  },
  {
    id: 'health',
    icon: '♡',
    en: 'Health',
    ka: 'ჯანმრთელობა',
    descEn: 'Science of wellbeing',
    descKa: 'ჯანმრთელობის მეცნიერება',
  },
  {
    id: 'environment',
    icon: '◇',
    en: 'Environment',
    ka: 'გარემო',
    descEn: 'Our living planet',
    descKa: 'ჩვენი ცოცხალი პლანეტა',
  },
  {
    id: 'physics',
    icon: '⚛',
    en: 'Physics',
    ka: 'ფიზიკა',
    descEn: 'Laws of nature',
    descKa: 'ბუნების კანონები',
  },
  {
    id: 'research',
    icon: '⌁',
    en: 'Research',
    ka: 'კვლევა',
    descEn: 'New evidence',
    descKa: 'ახალი მტკიცებულებები',
  },
];

@Component({
  selector: 'sp-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PostCardComponent, QuizCardComponent],
  template: `
    <section
      class="hero"
      [style.backgroundImage]="
        'linear-gradient(90deg, rgba(2,10,22,.98) 0%,rgba(2,10,22,.78) 38%,rgba(2,10,22,.05) 76%),url(' +
        heroPosts()[slide()].image +
        ')'
      "
    >
      <div class="hero-grid"></div>
      <div class="container hero-inner">
        <div class="hero-copy reveal">
          <span class="kicker"
            ><i></i
            >{{
              l.current() === 'en'
                ? 'LATEST DISCOVERIES. REAL IMPACT.'
                : 'უახლესი აღმოჩენები. რეალური გავლენა.'
            }}</span
          >
          <h1>
            {{ l.current() === 'en' ? 'The Pulse of' : 'მეცნიერების' }}
            <em>{{ l.current() === 'en' ? 'Science.' : 'პულსი.' }}</em
            ><br />{{ l.current() === 'en' ? 'The Future of Humanity.' : 'კაცობრიობის მომავალი.' }}
          </h1>
          <p>
            {{
              l.current() === 'en'
                ? 'Your source for scientific breakthroughs, research updates, and innovations shaping our world.'
                : 'სამეცნიერო მიღწევები, კვლევები და ინოვაციები, რომლებიც ჩვენს სამყაროს ცვლის.'
            }}
          </p>
          <div class="hero-actions">
            <a class="btn" routerLink="/news"
              >{{ l.current() === 'en' ? 'Explore latest news' : 'აღმოაჩინე სიახლეები' }}
              <span>→</span></a
            ><a class="play-link" [routerLink]="['/post', heroPosts()[slide()].id]"
              ><i>▶</i> {{ l.current() === 'en' ? 'Featured story' : 'მთავარი ამბავი' }}</a
            >
          </div>
        </div>
        <div class="hero-meta glass">
          <span>0{{ slide() + 1 }} / 0{{ heroPosts().length }}</span>
          <div>
            <small>{{ heroPosts()[slide()].category }}</small
            ><b>{{ l.text(heroPosts()[slide()].title) }}</b>
          </div>
          <div class="slider-dots">
            @for (p of heroPosts(); track p.id; let i = $index) {
              <button [class.active]="i === slide()" (click)="slide.set(i)"></button>
            }
          </div>
        </div>
      </div>
    </section>
    <section class="category-strip container glass">
      @for (c of cats; track c.id) {
        <a routerLink="/news" [queryParams]="{ category: c.id }" class="category-item"
          ><i>{{ c.icon }}</i>
          <div>
            <b>{{ l.current() === 'en' ? c.en : c.ka }}</b
            ><small>{{ l.current() === 'en' ? c.descEn : c.descKa }}</small>
          </div>
          <span>↗</span></a
        >
      }
    </section>
    <section class="section container">
      <div class="section-head">
        <div>
          <span class="kicker"
            ><i></i>{{ l.current() === 'en' ? 'THE FRONTIER' : 'ჰორიზონტი' }}</span
          >
          <h2>{{ l.current() === 'en' ? 'Latest discoveries' : 'უახლესი აღმოჩენები' }}</h2>
        </div>
        <a class="text-link" routerLink="/news"
          >{{ l.current() === 'en' ? 'View all stories' : 'ყველა სიახლე' }} →</a
        >
      </div>
      <div class="featured-grid">
        @for (post of posts.posts().slice(0, 3); track post.id) {
          <sp-post-card [post]="post" />
        }
      </div>
    </section>
    <section class="signal">
      <div class="container signal-inner">
        <div>
          <span class="kicker"
            ><i></i>{{ l.current() === 'en' ? 'TEST YOUR KNOWLEDGE' : 'შეამოწმე ცოდნა' }}</span
          >
          <h2>
            {{
              l.current() === 'en' ? 'Curiosity is a superpower.' : 'ცნობისმოყვარეობა სუპერძალაა.'
            }}
          </h2>
          <p>
            {{
              l.current() === 'en'
                ? 'Take a five-minute challenge and discover what you know.'
                : 'მიიღე ხუთწუთიანი გამოწვევა და აღმოაჩინე, რა იცი.'
            }}
          </p>
          <a class="btn" routerLink="/quizzes"
            >{{ l.current() === 'en' ? 'Explore quizzes' : 'ქვიზების ნახვა' }} →</a
          >
        </div>
        @if (quizzes.quizzes()[0]; as quiz) {
          <sp-quiz-card [quiz]="quiz" />
        }
      </div>
    </section>
  `,
})
export class HomePage implements OnDestroy {
  cats = categories;
  slide = signal(0);
  heroPosts = computed(() => this.posts.posts().slice(0, 5));
  timer = setInterval(() => this.slide.update((v) => (v + 1) % this.heroPosts().length), 6500);
  constructor(
    public l: LanguageService,
    public posts: PostService,
    public quizzes: QuizService,
  ) {}
  ngOnDestroy() {
    clearInterval(this.timer);
  }
}

@Component({
  selector: 'sp-news',
  standalone: true,
  imports: [CommonModule, FormsModule, PostCardComponent],
  template: `<section class="page-hero compact container">
      <span class="kicker"
        ><i></i>{{ l.current() === 'en' ? 'SCIENCE, CLEARLY TOLD' : 'მეცნიერება, გასაგებად' }}</span
      >
      <h1>{{ l.current() === 'en' ? 'Newsroom' : 'სიახლეები' }}</h1>
      <p>
        {{
          l.current() === 'en'
            ? 'Evidence, context and wonder — without the noise.'
            : 'ფაქტები, კონტექსტი და აღმოჩენის სიხარული — ზედმეტი ხმაურის გარეშე.'
        }}
      </p>
    </section>
    <section class="container section news-layout">
      <aside class="filters glass">
        <h3>{{ l.current() === 'en' ? 'Discover' : 'აღმოაჩინე' }}</h3>
        <button [class.active]="!category" (click)="category = ''">
          {{ l.current() === 'en' ? 'All stories' : 'ყველა ამბავი' }}
        </button>
        @for (c of cats; track c.id) {
          <button [class.active]="category === c.id" (click)="category = c.id">
            {{ l.current() === 'en' ? c.en : c.ka }}
          </button>
        }
      </aside>
      <div>
        <div class="search glass">
          <span>⌕</span
          ><input
            [(ngModel)]="search"
            [placeholder]="l.current() === 'en' ? 'Search the newsroom…' : 'მოძებნე სიახლე…'"
          />
        </div>
        <div class="posts-grid">
          @for (post of filtered(); track post.id) {
            <sp-post-card [post]="post" />
          } @empty {
            <div class="empty glass">
              <b>✦</b>
              <h3>{{ l.current() === 'en' ? 'No signals found' : 'სიახლე ვერ მოიძებნა' }}</h3>
              <p>
                {{
                  l.current() === 'en'
                    ? 'Try another topic or search phrase.'
                    : 'სცადე სხვა თემა ან საძიებო სიტყვა.'
                }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>`,
})
export class NewsPage implements OnInit {
  cats = categories;
  category = '';
  search = '';
  constructor(
    public l: LanguageService,
    public posts: PostService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.route.queryParamMap.subscribe((p) => (this.category = p.get('category') || ''));
  }
  filtered() {
    const q = this.search.toLowerCase();
    return this.posts
      .posts()
      .filter(
        (p) =>
          (!this.category || p.category === this.category) &&
          (!q ||
            this.l.text(p.title).toLowerCase().includes(q) ||
            this.l.text(p.excerpt).toLowerCase().includes(q)),
      );
  }
}

@Component({
  selector: 'sp-post-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    @if (post; as p) {
      <article class="article container">
        <a class="back" routerLink="/news"
          >← {{ l.current() === 'en' ? 'Back to newsroom' : 'სიახლეებზე დაბრუნება' }}</a
        >
        <header>
          <span class="pill">{{ p.category }}</span>
          <h1>{{ l.text(p.title) }}</h1>
          <p>{{ l.text(p.excerpt) }}</p>
          <div class="byline">
            <span class="avatar">{{ p.author[0] }}</span>
            <div>
              <b>{{ p.author }}</b
              ><small>{{ p.createdAt | date: 'longDate' }} · 6 min read</small>
            </div>
          </div>
        </header>
        <img class="article-cover" [src]="p.image" [alt]="l.text(p.title)" />
        <div class="article-layout">
          <aside class="share glass">
            <small>{{ l.current() === 'en' ? 'REACTIONS' : 'რეაქციები' }}</small
            ><button [class.active]="has('likes')" (click)="react('likes')">
              △ <b>{{ p.likes.length }}</b></button
            ><button [class.active]="has('dislikes')" (click)="react('dislikes')">
              ▽ <b>{{ p.dislikes.length }}</b>
            </button>
          </aside>
          <div class="article-body">
            @for (para of paragraphs(); track para) {
              <p>{{ para }}</p>
            }
          </div>
        </div>
        <section class="comments">
          <div class="section-head">
            <h2>
              {{ l.current() === 'en' ? 'The conversation' : 'დისკუსია' }}
              <sup>{{ comments().length }}</sup>
            </h2>
          </div>
          @if (auth.currentUser()) {
            <form class="comment-form glass" (ngSubmit)="comment()">
              <span class="avatar">{{ auth.currentUser()!.firstName[0] }}</span
              ><textarea
                name="comment"
                [(ngModel)]="commentText"
                required
                [placeholder]="
                  l.current() === 'en' ? 'Add to the conversation…' : 'დაწერე კომენტარი…'
                "
              ></textarea
              ><button class="btn small" [disabled]="!commentText.trim()">
                {{ l.current() === 'en' ? 'Publish' : 'გამოქვეყნება' }}
              </button>
            </form>
          } @else {
            <div class="login-prompt glass">
              <span>◉</span>
              <p>
                {{
                  l.current() === 'en'
                    ? 'Sign in to react and join the conversation.'
                    : 'რეაქციისა და კომენტარისთვის გაიარე ავტორიზაცია.'
                }}
              </p>
              <a class="btn small" routerLink="/login">{{
                l.current() === 'en' ? 'Sign in' : 'შესვლა'
              }}</a>
            </div>
          }
          <div class="comment-list">
            @for (c of comments(); track c.id) {
              <div class="comment">
                <span class="avatar">{{ c.userName[0] }}</span>
                <div>
                  <div>
                    <b>{{ c.userName }}</b
                    ><small>{{ c.createdAt | date: 'medium' }}</small>
                  </div>
                  <p>{{ c.text }}</p>
                </div>
                @if (auth.isAdmin()) {
                  <button class="icon-btn danger" (click)="posts.deleteComment(c.id)">×</button>
                }
              </div>
            } @empty {
              <p class="muted">
                {{
                  l.current() === 'en'
                    ? 'No comments yet. Start the conversation.'
                    : 'კომენტარი ჯერ არ არის.'
                }}
              </p>
            }
          </div>
        </section>
      </article>
    } @else {
      <section class="empty-page container">
        <h1>404</h1>
        <p>Story not found.</p>
        <a routerLink="/news" class="btn">Newsroom</a>
      </section>
    }
  `,
})
export class PostDetailsPage implements OnInit {
  post?: ReturnType<PostService['get']>;
  commentText = '';
  constructor(
    public l: LanguageService,
    public posts: PostService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit() {
    this.post = this.posts.get(this.route.snapshot.paramMap.get('id')!);
  }
  paragraphs() {
    return this.post ? this.l.text(this.post.content).split('\n').filter(Boolean) : [];
  }
  comments() {
    return this.post ? this.posts.comments().filter((c) => c.postId === this.post!.id) : [];
  }
  has(type: 'likes' | 'dislikes') {
    const u = this.auth.currentUser();
    return !!(u && this.post?.[type].includes(u.id));
  }
  react(type: 'likes' | 'dislikes') {
    const u = this.auth.currentUser();
    if (!u) {
      this.router.navigate(['/login']);
      return;
    }
    this.posts.react(this.post!.id, u.id, type);
    this.post = this.posts.get(this.post!.id);
  }
  comment() {
    const u = this.auth.currentUser();
    if (!u || !this.commentText.trim()) return;
    const c: Comment = {
      id: crypto.randomUUID(),
      postId: this.post!.id,
      userId: u.id,
      userName: `${u.firstName} ${u.lastName}`,
      avatar: u.avatar,
      text: this.commentText.trim(),
      createdAt: new Date().toISOString(),
    };
    this.posts.addComment(c);
    this.commentText = '';
  }
}

@Component({
  selector: 'sp-quizzes',
  standalone: true,
  imports: [QuizCardComponent],
  template: `<section class="page-hero compact container">
      <span class="kicker"
        ><i></i
        >{{
          l.current() === 'en' ? 'PLAY. LEARN. DISCOVER.' : 'ითამაშე. ისწავლე. აღმოაჩინე.'
        }}</span
      >
      <h1>{{ l.current() === 'en' ? 'Science quizzes' : 'სამეცნიერო ქვიზები' }}</h1>
      <p>
        {{
          l.current() === 'en'
            ? 'Small challenges for endlessly curious minds.'
            : 'პატარა გამოწვევები უსასრულოდ ცნობისმოყვარე გონებისთვის.'
        }}
      </p>
    </section>
    <section class="container section quiz-grid">
      @for (q of quizzes.quizzes(); track q.id) {
        <sp-quiz-card [quiz]="q" />
      } @empty {
        <div class="empty glass"><h3>No quizzes yet</h3></div>
      }
    </section>`,
})
export class QuizzesPage {
  constructor(
    public l: LanguageService,
    public quizzes: QuizService,
  ) {}
}

@Component({
  selector: 'sp-quiz-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `@if (quiz; as q) {
    <section class="quiz-stage container">
      <a class="back" routerLink="/quizzes"
        >← {{ l.current() === 'en' ? 'All quizzes' : 'ყველა ქვიზი' }}</a
      >
      @if (!started) {
        <div class="quiz-intro glass">
          <img [src]="q.image" />
          <div>
            <span class="pill"
              >{{ q.questions.length }} {{ l.current() === 'en' ? 'questions' : 'კითხვა' }}</span
            >
            <h1>{{ l.text(q.title) }}</h1>
            <p>{{ l.text(q.description) }}</p>
            <button class="btn" (click)="started = true">
              {{ l.current() === 'en' ? 'Begin challenge' : 'დაიწყე' }} →
            </button>
          </div>
        </div>
      } @else if (!finished) {
        <div class="quiz-player glass">
          <div class="quiz-progress">
            <span
              >{{ l.current() === 'en' ? 'Question' : 'კითხვა' }} {{ index + 1 }} /
              {{ q.questions.length }}</span
            >
            <div><i [style.width.%]="((index + 1) / q.questions.length) * 100"></i></div>
          </div>
          <span class="question-icon">?</span>
          <h2>{{ l.text(q.questions[index].text) }}</h2>
          <div class="options">
            @for (o of q.questions[index].options; track $index) {
              <button [class.selected]="selected === $index" (click)="selected = $index">
                <i>{{ letters[$index] }}</i
                >{{ l.text(o.text) }}<span>○</span>
              </button>
            }
          </div>
          <button class="btn" [disabled]="selected === null" (click)="next()">
            {{
              index === q.questions.length - 1
                ? l.current() === 'en'
                  ? 'Finish'
                  : 'დასრულება'
                : l.current() === 'en'
                  ? 'Next question'
                  : 'შემდეგი'
            }}
            →
          </button>
        </div>
      } @else {
        <div class="quiz-result glass">
          <div class="score-ring">
            <b>{{ score }}</b
            ><span>/ {{ q.questions.length }}</span>
          </div>
          <span class="kicker"><i></i>{{ l.current() === 'en' ? 'RESULT' : 'შედეგი' }}</span>
          <h1>{{ resultText() }}</h1>
          <p>
            {{
              l.current() === 'en'
                ? 'Every answer is another orbit around a new idea.'
                : 'ყოველი პასუხი ახალი იდეის გარშემო კიდევ ერთი ორბიტაა.'
            }}
          </p>
          <div>
            <button class="btn" (click)="restart()">
              ↻ {{ l.current() === 'en' ? 'Try again' : 'თავიდან' }}</button
            ><a class="btn ghost" routerLink="/quizzes">{{
              l.current() === 'en' ? 'More quizzes' : 'სხვა ქვიზები'
            }}</a>
          </div>
        </div>
      }
    </section>
  }`,
})
export class QuizDetailsPage implements OnInit {
  quiz?: ReturnType<QuizService['get']>;
  started = false;
  finished = false;
  index = 0;
  score = 0;
  selected: number | null = null;
  letters = ['A', 'B', 'C', 'D'];
  constructor(
    public l: LanguageService,
    private quizzes: QuizService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.quiz = this.quizzes.get(this.route.snapshot.paramMap.get('id')!);
  }
  next() {
    if (this.selected === this.quiz!.questions[this.index].correct) this.score++;
    if (this.index === this.quiz!.questions.length - 1) this.finished = true;
    else {
      this.index++;
      this.selected = null;
    }
  }
  resultText() {
    const r = this.quiz!.results;
    return this.l.text(
      this.score / this.quiz!.questions.length < 0.5
        ? r.low
        : this.score / this.quiz!.questions.length < 0.8
          ? r.medium
          : r.high,
    );
  }
  restart() {
    this.index = 0;
    this.score = 0;
    this.selected = null;
    this.finished = false;
    this.started = true;
  }
}

@Component({
  selector: 'sp-about',
  standalone: true,
  template: `<section class="about-hero container">
      <div>
        <span class="kicker"><i></i>SCIENCE PULSE</span>
        <h1>
          {{
            l.current() === 'en'
              ? 'For everyone who keeps asking why.'
              : 'ყველასთვის, ვინც კითხვას — „რატომ?“ — არასდროს წყვეტს.'
          }}
        </h1>
        <p>
          {{
            l.current() === 'en'
              ? 'We are a bilingual science newsroom built to make the world’s most important discoveries clear, beautiful and human.'
              : 'ჩვენ ვართ ორენოვანი სამეცნიერო პლატფორმა, რომელიც მნიშვნელოვან აღმოჩენებს გასაგებად, ლამაზად და ადამიანურად მოგიყვება.'
          }}
        </p>
      </div>
      <div class="orbit-art">
        <div class="planet">✦</div>
        <i></i><i></i><i></i>
      </div>
    </section>
    <section class="container values section">
      <article class="glass">
        <span>01</span>
        <h3>{{ l.current() === 'en' ? 'Clarity over clutter' : 'სიცხადე ხმაურზე წინ' }}</h3>
        <p>
          {{
            l.current() === 'en'
              ? 'We turn complex research into stories without losing the evidence.'
              : 'რთულ კვლევას ვაქცევთ ამბად ისე, რომ ფაქტები არ იკარგება.'
          }}
        </p>
      </article>
      <article class="glass">
        <span>02</span>
        <h3>
          {{
            l.current() === 'en'
              ? 'Curiosity without borders'
              : 'ცნობისმოყვარეობა საზღვრების გარეშე'
          }}
        </h3>
        <p>
          {{
            l.current() === 'en'
              ? 'Georgian and English readers meet the same universe here.'
              : 'აქ ქართველი და ინგლისურენოვანი მკითხველი ერთ სამყაროს ხვდება.'
          }}
        </p>
      </article>
      <article class="glass">
        <span>03</span>
        <h3>{{ l.current() === 'en' ? 'Wonder with rigor' : 'აღტაცება სიზუსტით' }}</h3>
        <p>
          {{
            l.current() === 'en'
              ? 'Big ideas deserve both imagination and careful context.'
              : 'დიდ იდეებს წარმოსახვაც სჭირდება და ზუსტი კონტექსტიც.'
          }}
        </p>
      </article>
    </section>`,
})
export class AboutPage {
  constructor(public l: LanguageService) {}
}

@Component({
  selector: 'sp-contacts',
  standalone: true,
  imports: [FormsModule],
  template: `<section class="page-hero compact container">
      <span class="kicker"
        ><i></i>{{ l.current() === 'en' ? 'LET’S CONNECT' : 'დაგვიკავშირდი' }}</span
      >
      <h1>{{ l.current() === 'en' ? 'Send us a signal.' : 'გამოგვიგზავნე სიგნალი.' }}</h1>
      <p>
        {{
          l.current() === 'en'
            ? 'A story idea, a question, or simply hello — our channel is open.'
            : 'ამბის იდეა, შეკითხვა ან უბრალოდ გამარჯობა — ჩვენი არხი ღიაა.'
        }}
      </p>
    </section>
    <section class="contact-layout container section">
      <div class="contact-cards">
        <a class="glass lift" href="mailto:nikaalaverdashvili12@gmail.com"
          ><i>✉</i><span><small>GMAIL</small><b>nikaalaverdashvili12&#64;gmail.com</b></span
          ><em>↗</em></a
        ><a class="glass lift" href="tel:+995555770827"
          ><i>⌕</i><span><small>PHONE</small><b>+995 555 770 827</b></span
          ><em>↗</em></a
        ><a
          class="glass lift"
          href="https://www.facebook.com/share/1JSTLNZU5A/?mibextid=wwXIfr"
          target="_blank"
          ><i>f</i><span><small>FACEBOOK</small><b>Science Pulse</b></span
          ><em>↗</em></a
        ><a class="glass lift" href="https://t.me/spacepulse_geo" target="_blank"
          ><i>➤</i><span><small>TELEGRAM</small><b>&#64;spacepulse_geo</b></span
          ><em>↗</em></a
        >
      </div>
      <form class="glass form-card" (ngSubmit)="sent = true" #f="ngForm">
        <h2>{{ l.current() === 'en' ? 'Tell us what’s on your mind' : 'მოგვწერე, რას ფიქრობ' }}</h2>
        <label
          >{{ l.current() === 'en' ? 'Your name' : 'სახელი'
          }}<input name="name" ngModel required /></label
        ><label>Email<input name="email" type="email" ngModel required email /></label
        ><label
          >{{ l.current() === 'en' ? 'Message' : 'შეტყობინება'
          }}<textarea name="message" ngModel required rows="6"></textarea></label
        ><button class="btn" [disabled]="f.invalid">
          {{ l.current() === 'en' ? 'Send message' : 'გაგზავნა' }} →
        </button>
        @if (sent) {
          <div class="success">
            ✓
            {{
              l.current() === 'en'
                ? 'Message received. We’ll be in touch.'
                : 'შეტყობინება მიღებულია. მალე დაგიკავშირდებით.'
            }}
          </div>
        }
      </form>
    </section>`,
})
export class ContactsPage {
  sent = false;
  constructor(public l: LanguageService) {}
}

@Component({
  selector: 'sp-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `<section class="auth-page">
    <div class="auth-visual">
      <div>
        <span class="brand-big">✦</span>
        <p>
          {{
            l.current() === 'en'
              ? '“Somewhere, something incredible is waiting to be known.”'
              : '„სადღაც, რაღაც საოცარი ელოდება აღმოჩენას.“'
          }}
        </p>
        <small>— Carl Sagan</small>
      </div>
    </div>
    <form class="auth-card glass" (ngSubmit)="submit()">
      <span class="kicker"
        ><i></i>{{ l.current() === 'en' ? 'WELCOME BACK' : 'კეთილი დაბრუნება' }}</span
      >
      <h1>{{ l.current() === 'en' ? 'Sign in to your orbit' : 'დაუბრუნდი შენს ორბიტას' }}</h1>
      <p>
        {{
          l.current() === 'en'
            ? 'Join the conversation around every discovery.'
            : 'ჩაერთე დისკუსიაში ყოველი აღმოჩენის გარშემო.'
        }}
      </p>
      <label
        >{{ l.current() === 'en' ? 'First name' : 'სახელი'
        }}<input name="first" [(ngModel)]="first" required autocomplete="given-name" /></label
      ><label
        >{{ l.current() === 'en' ? 'Last name' : 'გვარი'
        }}<input name="last" [(ngModel)]="last" required autocomplete="family-name" /></label
      ><label
        >{{ l.current() === 'en' ? 'Password' : 'პაროლი'
        }}<input
          name="password"
          [(ngModel)]="password"
          type="password"
          required
          autocomplete="current-password"
      /></label>
      @if (error) {
        <div class="error">
          !
          {{
            l.current() === 'en'
              ? 'Name or password is incorrect.'
              : 'სახელი, გვარი ან პაროლი არასწორია.'
          }}
        </div>
      }
      <button class="btn wide">{{ l.current() === 'en' ? 'Sign in' : 'შესვლა' }} →</button
      ><small class="auth-switch"
        >{{ l.current() === 'en' ? 'New to Science Pulse?' : 'ჯერ არ გაქვს ანგარიში?' }}
        <a routerLink="/register">{{
          l.current() === 'en' ? 'Create account' : 'რეგისტრაცია'
        }}</a></small
      >
      <div class="demo-note">Demo admin: Nika · Alaverdashvili · D28ffMMs</div>
    </form>
  </section>`,
})
export class LoginPage {
  first = '';
  last = '';
  password = '';
  error = false;
  constructor(
    public l: LanguageService,
    private auth: AuthService,
    private router: Router,
  ) {}
  submit() {
    this.error = !this.auth.login(this.first, this.last, this.password);
    if (!this.error) this.router.navigate(['/profile']);
  }
}

@Component({
  selector: 'sp-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `<section class="auth-page">
    <div class="auth-visual register-visual">
      <div>
        <span class="brand-big">◎</span>
        <p>
          {{
            l.current() === 'en'
              ? 'Your place in the universe of ideas.'
              : 'შენი ადგილი იდეების სამყაროში.'
          }}
        </p>
      </div>
    </div>
    <form class="auth-card glass" (ngSubmit)="submit()" #f="ngForm">
      <span class="kicker"
        ><i></i>{{ l.current() === 'en' ? 'JOIN THE COMMUNITY' : 'შემოუერთდი საზოგადოებას' }}</span
      >
      <h1>{{ l.current() === 'en' ? 'Create your account' : 'შექმენი ანგარიში' }}</h1>
      <div class="avatar-upload" (click)="file.click()">
        @if (avatar) {
          <img [src]="avatar" />
        } @else {
          <span>＋</span>
        }
        <small>{{ l.current() === 'en' ? 'Optional photo' : 'ფოტო (არასავალდებულო)' }}</small
        ><input #file hidden type="file" accept="image/*" (change)="image($event)" />
      </div>
      <div class="two-cols">
        <label
          >{{ l.current() === 'en' ? 'First name' : 'სახელი'
          }}<input name="first" [(ngModel)]="first" required /></label
        ><label
          >{{ l.current() === 'en' ? 'Last name' : 'გვარი'
          }}<input name="last" [(ngModel)]="last" required
        /></label>
      </div>
      <label
        >{{ l.current() === 'en' ? 'Password' : 'პაროლი'
        }}<input
          name="password"
          [(ngModel)]="password"
          type="password"
          required
          minlength="8"
          pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
      /></label>
      <ul class="password-rules">
        <li [class.ok]="password.length >= 8">
          ✓ {{ l.current() === 'en' ? 'At least 8 characters' : 'მინიმუმ 8 სიმბოლო' }}
        </li>
        <li [class.ok]="uppercase.test(password)">
          ✓ {{ l.current() === 'en' ? 'One uppercase letter' : 'ერთი დიდი ასო' }}
        </li>
        <li [class.ok]="number.test(password)">
          ✓ {{ l.current() === 'en' ? 'One number' : 'ერთი ციფრი' }}
        </li>
      </ul>
      @if (error) {
        <div class="error">
          !
          {{
            l.current() === 'en'
              ? 'An account with this name already exists.'
              : 'ამ სახელით ანგარიში უკვე არსებობს.'
          }}
        </div>
      }
      <button class="btn wide" [disabled]="f.invalid">
        {{ l.current() === 'en' ? 'Create account' : 'რეგისტრაცია' }} →</button
      ><small class="auth-switch"
        >{{ l.current() === 'en' ? 'Already a member?' : 'უკვე გაქვს ანგარიში?' }}
        <a routerLink="/login">{{ l.current() === 'en' ? 'Sign in' : 'შესვლა' }}</a></small
      >
    </form>
  </section>`,
})
export class RegisterPage {
  first = '';
  last = '';
  password = '';
  avatar = '';
  error = false;
  uppercase = /[A-Z]/;
  number = /[0-9]/;
  constructor(
    public l: LanguageService,
    private auth: AuthService,
    private router: Router,
  ) {}
  image(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) {
      const r = new FileReader();
      r.onload = () => (this.avatar = r.result as string);
      r.readAsDataURL(f);
    }
  }
  submit() {
    this.error = !!this.auth.register({
      firstName: this.first,
      lastName: this.last,
      password: this.password,
      avatar: this.avatar,
    });
    if (!this.error) this.router.navigate(['/profile']);
  }
}

@Component({
  selector: 'sp-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `@if (auth.currentUser(); as u) {
    <section class="profile container">
      <div class="profile-head glass">
        <div class="profile-avatar">
          @if (u.avatar) {
            <img [src]="u.avatar" />
          } @else {
            <span>{{ u.firstName[0] }}{{ u.lastName[0] }}</span>
          }
        </div>
        <div>
          <span class="pill">{{ u.role }}</span>
          <h1>{{ u.firstName }} {{ u.lastName }}</h1>
          <p>
            {{ l.current() === 'en' ? 'Exploring Science Pulse since' : 'Science Pulse-ის წევრი' }}
            {{ u.joinedAt | date: 'MMMM y' }}
          </p>
        </div>
        <button class="btn ghost" (click)="auth.logout()">
          {{ l.current() === 'en' ? 'Sign out' : 'გასვლა' }}
        </button>
      </div>
      <div class="profile-grid">
        <div class="glass stat">
          <b>{{ userComments() }}</b
          ><span>{{ l.current() === 'en' ? 'Comments' : 'კომენტარი' }}</span>
        </div>
        <div class="glass stat">
          <b>{{ reactions() }}</b
          ><span>{{ l.current() === 'en' ? 'Reactions' : 'რეაქცია' }}</span>
        </div>
        <div class="glass stat">
          <b>{{ u.role === 'admin' ? '∞' : '01' }}</b
          ><span>{{ l.current() === 'en' ? 'Curiosity level' : 'ცნობისმოყვარეობა' }}</span>
        </div>
      </div>
      @if (auth.canCreate()) {
        <div class="creator-banner glass">
          <div>
            <span>✦</span>
            <h2>
              {{
                l.current() === 'en'
                  ? 'Your publishing studio is ready.'
                  : 'შენი საგამომცემლო სტუდია მზადაა.'
              }}
            </h2>
          </div>
          <a class="btn" routerLink="/admin"
            >{{ l.current() === 'en' ? 'Open studio' : 'სტუდიის გახსნა' }} →</a
          >
        </div>
      }
    </section>
  }`,
})
export class ProfilePage {
  constructor(
    public auth: AuthService,
    public l: LanguageService,
    private posts: PostService,
  ) {}
  userComments() {
    return this.posts.comments().filter((c) => c.userId === this.auth.currentUser()?.id).length;
  }
  reactions() {
    const id = this.auth.currentUser()?.id;
    return this.posts
      .posts()
      .reduce(
        (n, p) =>
          n + (p.likes.includes(id || '') ? 1 : 0) + (p.dislikes.includes(id || '') ? 1 : 0),
        0,
      );
  }
}
