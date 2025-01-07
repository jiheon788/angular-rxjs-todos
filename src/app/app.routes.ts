import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoDetailComponent } from './pages/todo-detail/todo-detail.component';
import { TodoFormComponent } from './pages/todo-form/todo-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'todos/new', component: TodoFormComponent, pathMatch: 'full' },
  { path: 'todos/:id', component: TodoDetailComponent }, // 상세 페이지 라우트
  { path: 'todos/edit/:id', component: TodoFormComponent },
];
