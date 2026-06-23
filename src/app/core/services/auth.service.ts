import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from '../models/models';

const ADMIN: User = {
  id: 'admin-1',
  firstName: 'Nika',
  lastName: 'Alaverdashvili',
  password: 'D28ffMMs',
  role: 'admin',
  joinedAt: '2026-01-01T10:00:00.000Z',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'sp_users';
  readonly users = signal<User[]>(this.loadUsers());
  readonly currentUser = signal<User | null>(this.loadCurrent());
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly canCreate = computed(() =>
    ['admin', 'creator'].includes(this.currentUser()?.role || ''),
  );
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  constructor(private router: Router) {}

  private loadUsers(): User[] {
    const saved = JSON.parse(localStorage.getItem(this.usersKey) || '[]') as User[];
    if (!saved.some((u) => u.id === ADMIN.id)) saved.unshift(ADMIN);
    localStorage.setItem(this.usersKey, JSON.stringify(saved));
    return saved;
  }
  private loadCurrent(): User | null {
    return JSON.parse(localStorage.getItem('sp_currentUser') || 'null');
  }
  private persist() {
    localStorage.setItem(this.usersKey, JSON.stringify(this.users()));
  }
  login(firstName: string, lastName: string, password: string): boolean {
    const user = this.users().find(
      (u) =>
        u.firstName.toLowerCase() === firstName.trim().toLowerCase() &&
        u.lastName.toLowerCase() === lastName.trim().toLowerCase() &&
        u.password === password,
    );
    if (!user) return false;
    this.currentUser.set(user);
    localStorage.setItem('sp_currentUser', JSON.stringify(user));
    return true;
  }
  register(data: Omit<User, 'id' | 'role' | 'joinedAt'>): string | null {
    if (
      this.users().some(
        (u) =>
          u.firstName.toLowerCase() === data.firstName.toLowerCase() &&
          u.lastName.toLowerCase() === data.lastName.toLowerCase(),
      )
    )
      return 'exists';
    const user: User = {
      ...data,
      id: crypto.randomUUID(),
      role: 'user',
      joinedAt: new Date().toISOString(),
    };
    this.users.update((v) => [...v, user]);
    this.persist();
    this.currentUser.set(user);
    localStorage.setItem('sp_currentUser', JSON.stringify(user));
    return null;
  }
  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('sp_currentUser');
    this.router.navigate(['/']);
  }
  setRole(id: string, role: Role) {
    if (id === ADMIN.id) return;
    this.users.update((v) => v.map((u) => (u.id === id ? { ...u, role } : u)));
    this.persist();
  }
}
