import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchTodoById(id);
    } else {
      this.errorMessage = 'Invalid Todo ID.';
    }
  }

  fetchTodoById(id: string): void {
    this.todoService.getTodoById(id).subscribe({
      next: (response) => {
        this.todo = response.data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch the Todo. Please try again.';
        console.error(err);
      },
    });
  }
}
