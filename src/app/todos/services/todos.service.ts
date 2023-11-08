import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosSig = signal<TodoInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  changeFilter(filterName: FilterEnum): void {
    // set overrides completely the data inside signal
    this.filterSig.set(filterName);
  }

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };

    // Update signal () => return new arrays of todos
    this.todosSig.update((todos) => [...todos, newTodo]);
  }

  changeTodo(id: string, text: string): void {
    this.todosSig.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }

  removeTodo(id: string): void {
    this.todosSig.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: string): void {
    this.todosSig.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  toggleAll(isCompleted: boolean): void {
    this.todosSig.update((todos) =>
      todos.map((todo) => ({ ...todo, isCompleted }))
    );
  }
}
