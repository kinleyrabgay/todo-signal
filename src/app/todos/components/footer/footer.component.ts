import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  todosService = inject(TodoService);
  // filter = this.todosService.filterSig(); wrong
  filterSig = this.todosService.filterSig;

  // Computed property for count
  activeCount = computed(() => {
    return this.todosService.todosSig().filter((todo) => !todo.isCompleted)
      .length;
  });

  noTodosClass = computed(() => this.todosService.todosSig().length === 0);
  itemsLeftText = computed(
    () => `item${this.activeCount() !== 1 ? 's' : ''} left`
  );

  filterEnum = FilterEnum;

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
    // console.log('after changeFiler', this.todosService.filterSig());
  }
}
