import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy, OnChanges {
  todosService = inject(TodoService);
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';

  @ViewChild('textInput') textInput?: ElementRef;

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }
  ngOnDestroy(): void {}

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo(id: string): void {
    this.todosService.removeTodo(id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }
}
