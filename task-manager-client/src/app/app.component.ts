import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { DialogModule } from 'primeng/dialog';
import { CreateTaskBtnComponent } from "./components/create-task-btn/create-task-btn.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [
    TaskFormComponent,
    TaskListComponent,
    DialogModule,
    CreateTaskBtnComponent,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  displayTaskDialog = false;

  constructor(
    private messageService: MessageService
  ) {}

  showTaskDialog() {
    this.displayTaskDialog = true;
  }

  hideTaskDialog() {
    this.displayTaskDialog = false;
  }

  onTaskCreated() {
    this.hideTaskDialog();

    this.messageService.add({
      severity: "success",
      summary: "Task Created",
      detail: "Your task has been created successfully!"
    })
  }
}
