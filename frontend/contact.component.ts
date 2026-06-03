import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  feedbackForm: FormGroup;
  contactForm: FormGroup;
  feedbackSuccess = '';
  contactSuccess = '';
  feedbackError = '';
  contactError = '';
  feedbackLoading = false;
  contactLoading = false;

  ratings = [1, 2, 3, 4, 5];
  selectedRating = 5;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      rating: [5],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  setRating(r: number) { this.selectedRating = r; this.feedbackForm.patchValue({ rating: r }); }

  submitFeedback() {
    if (this.feedbackForm.invalid) return;
    this.feedbackLoading = true;
    this.http.post(`${environment.apiUrl}/feedback`, {
      name: this.feedbackForm.value.name,
      email: '',
      message: this.feedbackForm.value.message,
      rating: this.selectedRating
    }).subscribe({
      next: () => {
        this.feedbackSuccess = 'Thank you for your feedback!';
        this.feedbackForm.reset();
        this.selectedRating = 5;
        this.feedbackLoading = false;
      },
      error: () => { this.feedbackError = 'Failed to submit. Try again.'; this.feedbackLoading = false; }
    });
  }

  submitContact() {
    if (this.contactForm.invalid) return;
    this.contactLoading = true;
    this.http.post(`${environment.apiUrl}/feedback`, {
      ...this.contactForm.value,
      rating: 5
    }).subscribe({
      next: () => {
        this.contactSuccess = 'Message sent! We\'ll be in touch soon.';
        this.contactForm.reset();
        this.contactLoading = false;
      },
      error: () => { this.contactError = 'Failed to send. Try again.'; this.contactLoading = false; }
    });
  }
}