import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Meme } from '../Services/meme.service';
import { AuthService } from '../Services/auth.service';
import { MemeService } from '../Services/meme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.css']
})
export class MemeCardComponent {
  @Input() meme!: Meme;
  @Output() likeToggled = new EventEmitter<{ id: number; liked: boolean; likeCount: number }>();

  constructor(public auth: AuthService, private memeService: MemeService, private router: Router) {}

  toggleLike() {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/login']); return; }
    this.memeService.toggleLike(this.meme.id).subscribe(res => {
      this.meme.isLiked = res.liked;
      this.meme.likeCount = res.likeCount;
      this.likeToggled.emit({ id: this.meme.id, liked: res.liked, likeCount: res.likeCount });
    });
  }

  getMoodEmoji(mood: string): string {
    const map: Record<string, string> = { happy: '😄', sad: '😢', frustrated: '😤' };
    return map[mood] || '😶';
  }
}