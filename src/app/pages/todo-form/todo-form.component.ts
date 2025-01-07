import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';

const errorMessages: { [key: string]: string } = {
  required: 'This field is required.',
  maxlength: 'Maximum allowed length is {requiredLength} characters.',
};

function getErrorMessage(errors: any): string | null {
  if (!errors) return null;

  for (const errorKey of Object.keys(errors)) {
    const messageTemplate = errorMessages[errorKey];
    if (messageTemplate) {
      return messageTemplate.replace(
        /\{(\w+)\}/g,
        (_, key) => errors[errorKey][key] || ''
      );
    }
  }

  return null;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;
  isEditMode = false;
  todoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 폼 초기화
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(12)]],
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });

    // 수정 모드 확인
    this.todoId = this.route.snapshot.paramMap.get('id');
    if (this.todoId) {
      this.isEditMode = true;
      this.loadTodo();
    }
  }

  // 기존 Todo 로드 (수정 모드)
  loadTodo(): void {
    if (this.todoId) {
      this.todoService.getTodoById(this.todoId).subscribe({
        next: (response) => {
          this.todoForm.patchValue(response.data);
        },
        error: (err) => console.error(err),
      });
    }
  }

  // 폼 제출 처리
  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const todoData = this.todoForm.value;

    if (this.isEditMode && this.todoId) {
      // 수정 처리
      this.todoService.updateTodo(this.todoId, todoData).subscribe({
        next: () => {
          alert('Todo가 성공적으로 수정되었습니다.');
          this.router.navigate(['/todos']);
        },
        error: (err) => console.error(err),
      });
    } else {
      // 추가 처리
      this.todoService.createTodo(todoData).subscribe({
        next: () => {
          alert('Todo가 성공적으로 추가되었습니다.');
          this.router.navigate(['/todos']);
        },
        error: (err) => console.error(err),
      });
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.todoForm.get(controlName);
    return control && control.touched ? getErrorMessage(control.errors) : null;
  }
}
