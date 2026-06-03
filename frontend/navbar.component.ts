import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: AuthUser | null = null;
  isDark = false;
  menuOpen = false;
  currentTime = '';
  currentDate = '';

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe(u => this.user = u);
    this.isDark = localStorage.getItem('moodmeme_theme') === 'dark';
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.currentDate = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const theme = this.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('moodmeme_theme', theme);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu() { this.menuOpen = false; }
}   