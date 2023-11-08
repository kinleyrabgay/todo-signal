import { Injectable, signal } from "@angular/core";
import { TodoInterface } from "../types/todo.interface";

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  todosSig = signal<TodoInterface[]>([]);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text, 
      isCompleted: false,
      id: Math.random().toString(16),
    }

    // Update signal () => return new arrays of todos
    this.todosSig.update( todos => [...todos, newTodo])
  }
}