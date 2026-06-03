import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environment';

export interface AuthUser {
  token: string;
  username: string;
  email: string;
  role: string;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<AuthUser | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadUser(): AuthUser | null {
    const data = localStorage.getItem('moodmeme_user');
    return data ? JSON.parse(data) : null;
  }

  get currentUser(): AuthUser | null { return this.userSubject.value; }
  get isLoggedIn(): boolean { return !!this.userSubject.value; }
  get isAdmin(): boolean { return this.userSubject.value?.role === 'Admin'; }

  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(user => {
        localStorage.setItem('moodmeme_user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, email, password });
  }

  logout(): void {
    localStorage.removeItem('moodmeme_user');
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return this.userSubject.value?.token ?? null;
  }
}