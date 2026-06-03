import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  moods = [
    { key: 'happy', label: 'Happy', emoji: '😄', desc: 'Spread joy with the funniest memes', color: '#f59e0b' },
    { key: 'sad', label: 'Sad', emoji: '😢', desc: 'Find comfort in relatable sad memes', color: '#3b82f6' },
    { key: 'frustrated', label: 'Frustrated', emoji: '😤', desc: 'Let off steam with frustration memes', color: '#ef4444' }
  ];

  constructor(private router: Router) {}

  selectMood(mood: string) {
    this.router.navigate(['/generate'], { queryParams: { mood } });
  }
}