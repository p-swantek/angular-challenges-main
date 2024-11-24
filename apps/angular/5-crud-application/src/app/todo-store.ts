import { computed, inject, Injectable, signal } from "@angular/core";
import { Todo } from "./todo";
import { TodoService } from "./todo.service";
import { randText } from "@ngneat/falso";

@Injectable()
export class TodoStore {
  private  todoService = inject(TodoService);
  private todos = signal<Todo[]>([]);

  currentTodos = computed(() => this.todos())

  constructor(){
    this.todoService.getAllTodos().subscribe(todos => this.todos.set(todos));
  }


  updateTodo(todo: Todo) {
    const updatedTodo: Todo = {
      ...todo,
      title: randText()
    }
    this.todoService.updateTodo(updatedTodo).subscribe(updated => {
      const curr = this.todos();

      const todoIndex = curr.findIndex(td => td.id === updated.id);
      if (todoIndex !== -1){
        curr[todoIndex] = {
          ...curr[todoIndex],
          ...updated
        }
        this.todos.set([...curr]);
      }

    })
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodoById(todo.id).subscribe(() => {
      const todoRemovedList = this.todos().filter(currTodo => currTodo.id !== todo.id)
      this.todos.set(todoRemovedList)
    })
  }

}
