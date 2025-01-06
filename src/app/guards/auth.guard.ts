import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // JWT 토큰 확인
    if (token) {
      return true; // 인증 성공
    } else {
      this.router.navigate(['/login']); // 인증 실패 시 로그인 페이지로 이동
      return false;
    }
  }
}
