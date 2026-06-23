import { Injectable, signal } from '@angular/core';
import { Comment, Post } from '../models/models';

const img = '/assets/earth-hero.png';
const POSTS: Post[] = [
  {
    id: 'p1',
    category: 'space',
    image: img,
    author: 'Science Pulse',
    createdAt: '2026-06-20T09:00:00Z',
    likes: [],
    dislikes: [],
    title: {
      en: 'A new window into the earliest galaxies',
      ka: 'ახალი ფანჯარა ყველაზე ადრეულ გალაქტიკებში',
    },
    excerpt: {
      en: 'Astronomers reveal a surprisingly vivid portrait of the young universe.',
      ka: 'ასტრონომებმა ახალგაზრდა სამყაროს გასაოცრად ნათელი სურათი წარმოადგინეს.',
    },
    content: {
      en: 'A new generation of deep-sky observations is changing how scientists understand the first billion years after the Big Bang. The findings suggest that early galaxies assembled stars faster and more efficiently than many models predicted. Researchers are now comparing spectra from hundreds of distant sources to reconstruct how the first cosmic structures evolved.\n\nThe work is still unfolding, but it already gives scientists a sharper timeline for the universe’s transformation from darkness to a landscape filled with stars.',
      ka: 'ღრმა კოსმოსზე დაკვირვებების ახალი თაობა ცვლის ჩვენს წარმოდგენას დიდი აფეთქების შემდეგ პირველ მილიარდ წელზე. აღმოჩენები აჩვენებს, რომ ადრეული გალაქტიკები ვარსკვლავებს ბევრად სწრაფად ქმნიდნენ, ვიდრე მოდელები ვარაუდობდა.\n\nკვლევა გრძელდება, თუმცა ის უკვე გვაძლევს სამყაროს განვითარების უფრო ზუსტ ქრონოლოგიას.',
    },
  },
  {
    id: 'p2',
    category: 'technology',
    image: img,
    author: 'Mariam K.',
    createdAt: '2026-06-18T12:00:00Z',
    likes: [],
    dislikes: [],
    title: {
      en: 'Quantum sensors move beyond the laboratory',
      ka: 'კვანტური სენსორები ლაბორატორიას სცდება',
    },
    excerpt: {
      en: 'Ultra-sensitive instruments are beginning to solve practical problems.',
      ka: 'ზემგრძნობიარე ხელსაწყოები პრაქტიკული ამოცანების გადაჭრას იწყებს.',
    },
    content: {
      en: 'Quantum sensors can measure tiny changes in gravity, magnetic fields and time. Engineering teams are now shrinking these systems and improving their stability for use in navigation, medicine and Earth observation.',
      ka: 'კვანტურ სენსორებს გრავიტაციის, მაგნიტური ველისა და დროის უმცირესი ცვლილებების გაზომვა შეუძლიათ. ინჟინრები მათ ნავიგაციაში, მედიცინასა და დედამიწის კვლევაში გამოსაყენებლად აუმჯობესებენ.',
    },
  },
  {
    id: 'p3',
    category: 'health',
    image: img,
    author: 'Dr. Ana Reed',
    createdAt: '2026-06-15T08:30:00Z',
    likes: [],
    dislikes: [],
    title: { en: 'The hidden rhythm of cellular repair', ka: 'უჯრედული აღდგენის ფარული რიტმი' },
    excerpt: {
      en: 'Researchers map how biological clocks coordinate tissue recovery.',
      ka: 'მკვლევრები სწავლობენ, როგორ მართავს ბიოლოგიური საათი ქსოვილების აღდგენას.',
    },
    content: {
      en: 'Cells do not repair damage at a constant rate. New research shows that timing signals influence when key repair genes become active, opening a path toward treatments synchronized with the body’s own rhythms.',
      ka: 'უჯრედები დაზიანებას მუდმივი სიჩქარით არ აღადგენენ. ახალი კვლევა აჩვენებს, რომ დროის სიგნალები განსაზღვრავს აღდგენის გენების აქტივობას.',
    },
  },
  {
    id: 'p4',
    category: 'environment',
    image: img,
    author: 'Science Pulse',
    createdAt: '2026-06-11T11:15:00Z',
    likes: [],
    dislikes: [],
    title: { en: 'Listening to forests from orbit', ka: 'ტყეების მოსმენა ორბიტიდან' },
    excerpt: {
      en: 'Satellites and AI reveal ecosystem changes before they become visible.',
      ka: 'თანამგზავრები და AI ეკოსისტემის ცვლილებებს ადრეულ ეტაპზე ავლენს.',
    },
    content: {
      en: 'Combining radar, optical imagery and acoustic field data lets researchers detect subtle changes in forest health. The approach may help conservation teams respond earlier to drought, disease and illegal logging.',
      ka: 'რადარის, ოპტიკური გამოსახულებებისა და აკუსტიკური მონაცემების შერწყმა მკვლევრებს ტყის ჯანმრთელობის მცირე ცვლილებების აღმოჩენაში ეხმარება.',
    },
  },
  {
    id: 'p5',
    category: 'physics',
    image: img,
    author: 'Luka M.',
    createdAt: '2026-06-08T15:45:00Z',
    likes: [],
    dislikes: [],
    title: {
      en: 'Why turbulence remains physics’ beautiful mystery',
      ka: 'რატომ რჩება ტურბულენტობა ფიზიკის ლამაზ საიდუმლოდ',
    },
    excerpt: {
      en: 'A fresh experiment traces order inside apparently chaotic flows.',
      ka: 'ახალი ექსპერიმენტი ქაოსურ ნაკადებში წესრიგს პოულობს.',
    },
    content: {
      en: 'Turbulence appears everywhere from coffee cups to stellar atmospheres. Precision experiments are revealing recurring structures inside chaotic flows, giving theorists new clues about one of classical physics’ hardest problems.',
      ka: 'ტურბულენტობა ყველგან გვხვდება — ყავის ფინჯნიდან ვარსკვლავების ატმოსფერომდე. ზუსტი ექსპერიმენტები ქაოსურ ნაკადებში განმეორებად სტრუქტურებს ავლენს.',
    },
  },
  {
    id: 'p6',
    category: 'research',
    image: img,
    author: 'Editorial Desk',
    createdAt: '2026-06-04T10:20:00Z',
    likes: [],
    dislikes: [],
    title: {
      en: 'Open science is accelerating discovery',
      ka: 'ღია მეცნიერება აღმოჩენებს აჩქარებს',
    },
    excerpt: {
      en: 'Shared datasets are reshaping collaboration across disciplines.',
      ka: 'გაზიარებული მონაცემები დარგებს შორის თანამშრომლობას ცვლის.',
    },
    content: {
      en: 'Researchers are building common data standards and reusable tools that allow discoveries in one field to unlock progress in another. The result is a more connected scientific ecosystem.',
      ka: 'მკვლევრები ქმნიან მონაცემთა საერთო სტანდარტებსა და მრავალჯერად ინსტრუმენტებს, რომლებიც სხვადასხვა დარგს ერთმანეთთან აკავშირებს.',
    },
  },
];

@Injectable({ providedIn: 'root' })
export class PostService {
  readonly posts = signal<Post[]>(JSON.parse(localStorage.getItem('sp_posts') || 'null') || POSTS);
  readonly comments = signal<Comment[]>(JSON.parse(localStorage.getItem('sp_comments') || '[]'));
  constructor() {
    this.persist();
  }
  private persist() {
    localStorage.setItem('sp_posts', JSON.stringify(this.posts()));
    localStorage.setItem('sp_comments', JSON.stringify(this.comments()));
  }
  get(id: string) {
    return this.posts().find((p) => p.id === id);
  }
  add(post: Post) {
    this.posts.update((v) => [post, ...v]);
    this.persist();
  }
  react(postId: string, userId: string, type: 'likes' | 'dislikes') {
    this.posts.update((list) =>
      list.map((p) =>
        p.id !== postId
          ? p
          : {
              ...p,
              likes:
                type === 'likes'
                  ? p.likes.includes(userId)
                    ? p.likes.filter((x) => x !== userId)
                    : [...p.likes, userId]
                  : p.likes.filter((x) => x !== userId),
              dislikes:
                type === 'dislikes'
                  ? p.dislikes.includes(userId)
                    ? p.dislikes.filter((x) => x !== userId)
                    : [...p.dislikes, userId]
                  : p.dislikes.filter((x) => x !== userId),
            },
      ),
    );
    this.persist();
  }
  addComment(comment: Comment) {
    this.comments.update((v) => [...v, comment]);
    this.persist();
  }
  deleteComment(id: string) {
    this.comments.update((v) => v.filter((c) => c.id !== id));
    this.persist();
  }
}
