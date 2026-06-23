import { Injectable, signal } from '@angular/core';
import { Quiz } from '../models/models';

const QUIZZES: Quiz[] = [
  {
    id: 'q1',
    image: '/assets/earth-hero.png',
    createdAt: '2026-06-17T10:00:00Z',
    title: {
      en: 'How well do you know our cosmic address?',
      ka: 'რამდენად კარგად იცნობ ჩვენს კოსმოსურ მისამართს?',
    },
    description: {
      en: 'Travel from Earth to the edge of the observable universe in 5 questions.',
      ka: 'იმოგზაურე დედამიწიდან ხილული სამყაროს კიდემდე 5 კითხვაში.',
    },
    questions: [
      {
        text: {
          en: 'Which galaxy contains our Solar System?',
          ka: 'რომელ გალაქტიკაში მდებარეობს მზის სისტემა?',
        },
        options: [
          { text: { en: 'Andromeda', ka: 'ანდრომედა' } },
          { text: { en: 'Milky Way', ka: 'ირმის ნახტომი' } },
          { text: { en: 'Triangulum', ka: 'სამკუთხედი' } },
        ],
        correct: 1,
      },
      {
        text: {
          en: 'What is the closest star to Earth?',
          ka: 'რომელია დედამიწასთან უახლოესი ვარსკვლავი?',
        },
        options: [
          { text: { en: 'Sirius', ka: 'სირიუსი' } },
          { text: { en: 'The Sun', ka: 'მზე' } },
          { text: { en: 'Proxima Centauri', ka: 'პროქსიმა კენტავრი' } },
        ],
        correct: 1,
      },
      {
        text: {
          en: 'What force keeps planets in orbit?',
          ka: 'რომელი ძალა ინარჩუნებს პლანეტებს ორბიტაზე?',
        },
        options: [
          { text: { en: 'Magnetism', ka: 'მაგნეტიზმი' } },
          { text: { en: 'Gravity', ka: 'გრავიტაცია' } },
          { text: { en: 'Friction', ka: 'ხახუნი' } },
        ],
        correct: 1,
      },
      {
        text: { en: 'A light-year measures…', ka: 'სინათლის წელი ზომავს…' },
        options: [
          { text: { en: 'Time', ka: 'დროს' } },
          { text: { en: 'Brightness', ka: 'სიკაშკაშეს' } },
          { text: { en: 'Distance', ka: 'მანძილს' } },
        ],
        correct: 2,
      },
      {
        text: {
          en: 'Which planet has the largest ring system?',
          ka: 'რომელ პლანეტას აქვს ყველაზე დიდი რგოლების სისტემა?',
        },
        options: [
          { text: { en: 'Saturn', ka: 'სატურნი' } },
          { text: { en: 'Mars', ka: 'მარსი' } },
          { text: { en: 'Venus', ka: 'ვენერა' } },
        ],
        correct: 0,
      },
    ],
    results: {
      low: {
        en: 'Cosmic rookie — your journey has just begun.',
        ka: 'კოსმოსის ახალბედა — შენი მოგზაურობა ახლა იწყება.',
      },
      medium: {
        en: 'Star navigator — a strong result!',
        ka: 'ვარსკვლავთა ნავიგატორი — შესანიშნავი შედეგია!',
      },
      high: {
        en: 'Universe expert — stellar work!',
        ka: 'სამყაროს ექსპერტი — ვარსკვლავური შედეგია!',
      },
    },
  },
];

@Injectable({ providedIn: 'root' })
export class QuizService {
  readonly quizzes = signal<Quiz[]>(
    JSON.parse(localStorage.getItem('sp_quizzes') || 'null') || QUIZZES,
  );
  constructor() {
    this.persist();
  }
  private persist() {
    localStorage.setItem('sp_quizzes', JSON.stringify(this.quizzes()));
  }
  get(id: string) {
    return this.quizzes().find((q) => q.id === id);
  }
  add(quiz: Quiz) {
    this.quizzes.update((v) => [quiz, ...v]);
    this.persist();
  }
}
