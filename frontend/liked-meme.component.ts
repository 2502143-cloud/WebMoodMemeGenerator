import { Component, OnInit } from '@angular/core';
import { MemeService, Meme } from '../Services/meme.service';

@Component({
  selector: 'app-liked-memes',
  templateUrl: './liked-meme.component.html',
  styleUrls: ['./liked-meme.component.css']
})
export class LikedMemesComponent implements OnInit {
  memes: Meme[] = [];
  loading = false;
  activeTab = '';

  tabs = [
    { key: '', label: 'All', emoji: '🎭' },
    { key: 'happy', label: 'Happy', emoji: '😄' },
    { key: 'sad', label: 'Sad', emoji: '😢' },
    { key: 'frustrated', label: 'Frustrated', emoji: '😤' }
  ];

  constructor(private memeService: MemeService) {}

  ngOnInit() { this.loadLiked(); }

  loadLiked() {
    this.loading = true;
    this.memeService.getLikedMemes(this.activeTab || undefined).subscribe({
      next: memes => { this.memes = memes; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.loadLiked();
  }

  onUnlike(event: { id: number; liked: boolean }) {
    if (!event.liked) {
      this.memes = this.memes.filter(m => m.id !== event.id);
    }
  }
}