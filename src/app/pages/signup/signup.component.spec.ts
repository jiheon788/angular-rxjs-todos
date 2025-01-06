import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('SignupComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signUp']);

    await TestBed.configureTestingModule({
      imports: [
        SignUpComponent,
        FormsModule,
        RouterTestingModule,
        CommonModule,
      ],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signUp and handle success response', () => {
    const mockResponse = { message: '회원가입 성공', token: 'dummy-token' };
    authServiceSpy.signUp.and.returnValue(of(mockResponse)); // 성공 응답 설정

    component.email = 'test@example.com';
    component.password = 'password123';
    component.onSignUp();

    expect(authServiceSpy.signUp).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(component.successMessage).toBe('회원가입 성공');
    expect(component.errorMessage).toBeNull();
  });

  it('should call signUp and handle error response', () => {
    const mockError = { error: { details: '회원가입 실패' } };
    authServiceSpy.signUp.and.returnValue(throwError(mockError)); // 실패 응답 설정

    component.email = 'test@example.com';
    component.password = 'password123';
    component.onSignUp();

    expect(authServiceSpy.signUp).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(component.errorMessage).toBe('회원가입 실패');
    expect(component.successMessage).toBeNull();
  });
});
