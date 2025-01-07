import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient) {}

  // 전체 Todo 조회
  getTodos(): Observable<{ data: Todo[] }> {
    return this.http.get<{ data: Todo[] }>(this.apiUrl);
  }

  // 개별 Todo 조회
  getTodoById(id: string): Observable<{ data: Todo }> {
    return this.http.get<{ data: Todo }>(`${this.apiUrl}/${id}`);
  }
}
