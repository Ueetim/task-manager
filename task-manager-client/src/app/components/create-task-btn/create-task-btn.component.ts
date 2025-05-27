import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-task-btn',
  imports: [],
  templateUrl: './create-task-btn.component.html',
  styleUrl: './create-task-btn.component.css'
})
export class CreateTaskBtnComponent {
  @Output() createEvent = new EventEmitter<void>();

  createTask() {
    this.createEvent.emit();
  }
}
