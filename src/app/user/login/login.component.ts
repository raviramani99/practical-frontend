import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .subscribe({
          next: (res) => {
            if (res?.role == 2) {
              this.router.navigate(['/admin/users']);
            } else {
              this.router.navigate(['/']);
            }

          },
          error: (err) => {
            this.hasError = true;
            // Check if the error contains a message and use it
            if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'An unknown error occurred';
            }
          }
        });
    }
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  showToast() {
    setTimeout(() => {
      this.hasError = false;
    }, 3000); // Automatically hide the toast after 3 seconds
  }

  closeToast() {
    this.hasError = false;
  }
}
