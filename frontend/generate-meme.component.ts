import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeService, Meme } from '../Services/meme.service';

@Component({
  selector: 'app-generate-meme',
  templateUrl: './generate-meme.component.html',
  styleUrls: ['./generate-meme.component.css']
})
export class GenerateMemeComponent implements OnInit {
  memes: Meme[] = [];
  loading = false;
  searchQuery = '';
  selectedMood = '';

  moods = [
    { key: '', label: 'All', emoji: '🎭' },
    { key: 'happy', label: 'Happy', emoji: '😄' },
    { key: 'sad', label: 'Sad', emoji: '😢' },
    { key: 'frustrated', label: 'Frustrated', emoji: '😤' }
  ];

  constructor(private memeService: MemeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedMood = params['mood'] || '';
      this.loadMemes();
    });
  }

  loadMemes() {
  this.loading = true;
  // Load both local DB memes AND Imgflip memes together
  const local$ = this.memeService.getMemes(
    this.selectedMood || undefined,
    this.searchQuery || undefined
  );
  const imgflip$ = this.memeService.getImgflipMemes(
    this.selectedMood || undefined
  );

  import('rxjs').then(({ forkJoin }) => {
    forkJoin([local$, imgflip$]).subscribe({
      next: ([localMemes, imgflipMemes]) => {
        // Combine both sources, remove duplicates by title
        const combined = [...localMemes, ...imgflipMemes];
        const seen = new Set<string>();
        this.memes = combined.filter(m => {
          if (seen.has(m.title)) return false;
          seen.add(m.title);
          return true;
        });
        this.loading = false;
      },
      error: () => {
        // If imgflip fails, just show local memes
        local$.subscribe({
          next: memes => { this.memes = memes; this.loading = false; },
          error: () => { this.loading = false; }
        });
      }
    });
  });
}

  selectMood(mood: string) {
    this.selectedMood = mood;
    this.loadMemes();
  }

  onSearch() { this.loadMemes(); }
  clearSearch() { this.searchQuery = ''; this.loadMemes(); }
}