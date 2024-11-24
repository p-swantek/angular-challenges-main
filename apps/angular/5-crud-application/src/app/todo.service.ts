import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Todo } from './todo';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todo: Todo): Observable<Todo>{
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        todo,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
  }

  deleteTodoById(id: number): Observable<void>{
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

}
