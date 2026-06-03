import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

export interface Meme {
  id: number;
  title: string;
  imageUrl: string;
  mood: string;
  tags: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface CreateMeme {
  title: string;
  imageUrl: string;
  mood: string;
  tags: string;
}

@Injectable({ providedIn: 'root' })
export class MemeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMemes(mood?: string, search?: string): Observable<Meme[]> {
    let params = new HttpParams();
    if (mood) params = params.set('mood', mood);
    if (search) params = params.set('search', search);
    return this.http.get<Meme[]>(`${this.apiUrl}/memes`, { params });
  }

  getMeme(id: number): Observable<Meme> {
    return this.http.get<Meme>(`${this.apiUrl}/memes/${id}`);
  }

  getLikedMemes(mood?: string): Observable<Meme[]> {
    let params = new HttpParams();
    if (mood) params = params.set('mood', mood);
    return this.http.get<Meme[]>(`${this.apiUrl}/memes/liked`, { params });
  }

  toggleLike(id: number): Observable<{ liked: boolean; likeCount: number }> {
    return this.http.post<{ liked: boolean; likeCount: number }>(`${this.apiUrl}/memes/${id}/like`, {});
  }

  createMeme(meme: CreateMeme): Observable<Meme> {
    return this.http.post<Meme>(`${this.apiUrl}/memes`, meme);
  }

  updateMeme(id: number, meme: CreateMeme): Observable<Meme> {
    return this.http.put<Meme>(`${this.apiUrl}/memes/${id}`, meme);
  }

  deleteMeme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/memes/${id}`);
  }
  getImgflipMemes(mood?: string): Observable<Meme[]> {
  let params = new HttpParams();
  if (mood) params = params.set('mood', mood);
  return this.http.get<Meme[]>(`${this.apiUrl}/memes/imgflip`, { params });
}
}