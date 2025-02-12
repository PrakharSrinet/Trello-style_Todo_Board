import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://dummyjson.com/todos';

  constructor(private http: HttpClient) {}

  // Fetch all todos from API
  getTodos(): Observable<Todo[]> {
    return this.http.get<{ todos: Todo[] }>(this.apiUrl).pipe(
      map(response =>
        response.todos.map(todo => ({
          ...todo,
          status: todo.completed ? 'completed' : 'pending',
        }))
      )
    );
  }

  // Add a new todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl + "/add", {
      todo: todo.todo,
      completed: todo.completed,
      userId: 1, // API requires userId
      description: todo.description || "" // Explicitly include description
    }).pipe(
      map(response => ({
        ...response,
        description: todo.description || "" // Ensure response includes description
      }))
    );
  }  

  // Update a todo
  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, {
      todo: todo.todo,
      completed: todo.status === 'completed',
    });
  }

  // Delete a todo
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
