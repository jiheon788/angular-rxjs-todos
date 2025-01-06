import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AuthService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should vall login API with correct data', () => {
    const mockResponse = {
      message: '로그인 성공',
      token: 'dummy-token',
    };
    const loginData = { email: 'test@example.com', password: 'password123' };

    service.login(loginData.email, loginData.password).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/users/login');

    expect(req.request.method).toBe('POST'); // HTTP 메서드 확인
    expect(req.request.body).toEqual(loginData); // 요청 데이터 확인
    req.flush(mockResponse); // Mock 응답 반환
  });

  it('should call signUp API with correct data', () => {
    const mockResponse = { message: '회원가입 성공', token: 'dummy-token' };
    const signUpData = { email: 'test@example.com', password: 'password123' };

    service
      .signUp(signUpData.email, signUpData.password)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse); // 응답 데이터 확인
      });

    const req = httpMock.expectOne('http://localhost:8080/users/create');
    expect(req.request.method).toBe('POST'); // HTTP 메서드 확인
    expect(req.request.body).toEqual(signUpData); // 요청 데이터 확인
    req.flush(mockResponse); // Mock 응답 반환
  });
});
