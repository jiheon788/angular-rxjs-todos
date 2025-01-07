import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 로그인 상태 확인
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  onLogout(): void {
    // 로그아웃 처리
    localStorage.removeItem('token'); // 토큰 제거
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // 로그인 페이지로 리디렉션
  }
}
