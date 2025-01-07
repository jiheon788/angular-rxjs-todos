import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  errorMessage: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (response) => {
        this.todos = response.data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch todos. Please try again.';
        console.error(err);
      },
    });
  }
}
