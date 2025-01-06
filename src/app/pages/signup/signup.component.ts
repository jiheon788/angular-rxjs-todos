import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [FormsModule, CommonModule],
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignUp(): void {
    this.authService.signUp(this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        localStorage.setItem('token', response.token); // 토큰 저장
        this.router.navigate(['/']); // 회원가입 후 홈으로 이동
      },
      error: (error) => {
        this.errorMessage = error.error?.details || '회원가입에 실패했습니다.';
      },
    });
  }
}
