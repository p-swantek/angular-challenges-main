import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Todo } from './todo';
import { TodoStore } from './todo-store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `

    @for (todo of todoStore.currentTodos(); track $index) {
      <div >
          {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>

      </div>
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
