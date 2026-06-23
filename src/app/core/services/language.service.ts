import { Injectable, signal } from '@angular/core';
import { Bilingual, Language } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<Language>((localStorage.getItem('sp_language') as Language) || 'en');
  set(lang: Language) {
    this.current.set(lang);
    localStorage.setItem('sp_language', lang);
  }
  toggle() {
    this.set(this.current() === 'en' ? 'ka' : 'en');
  }
  text(value: Bilingual) {
    return value[this.current()];
  }
}
