import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const theme = localStorage.getItem('moodmeme_theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}