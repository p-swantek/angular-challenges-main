import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Todo } from './todo';
import { TodoStore } from './todo-store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinner],
  selector: 'app-root',
  template: `

    @if (todoStore.allTodosLoading()) {
      <mat-spinner/>
    }

    @else {
      @for (todo of todoStore.currentTodos(); track todo.id) {
      <div >
          {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>

      </div>
    }
    }



  `,
  providers: [TodoStore]
})
export class AppComponent {

  todoStore = inject(TodoStore);

  update(todo: Todo) {
    this.todoStore.updateTodo(todo);
  }

  delete(todo: Todo) {
    this.todoStore.deleteTodo(todo);
  }
}
