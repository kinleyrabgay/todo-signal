import { Component } from '@angular/core';
import { TodosComponent } from './todos/todos.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet,TodosComponent]
})
export class AppComponent {
  title = 'signal-todo';
}
