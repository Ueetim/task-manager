import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { Task, TaskStatus } from "../../models/task.model";
import { MessageService, ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { StatsAreaComponent } from "../stats-area/stats-area.component";

interface StatusOption {
  label: string
  value: TaskStatus | "ALL"
}

@Component({
  imports: [
    ConfirmDialogModule,
    DropdownModule,
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    StatsAreaComponent
],
  providers: [
    MessageService,
    ConfirmationService
  ],
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  loading = false;
  selectedStatus: TaskStatus | "ALL" = "ALL";
  searchText = "";

  taskStatus = TaskStatus;

  statusOptions: StatusOption[] = [
    { label: "All Tasks", value: "ALL" },
    { label: "Open", value: TaskStatus.OPEN },
    { label: "In Progress", value: TaskStatus.IN_PROGRESS },
    { label: "Completed", value: TaskStatus.DONE },
  ];

  taskStatusOptions = [
    { label: "Open", value: TaskStatus.OPEN },
    { label: "In Progress", value: TaskStatus.IN_PROGRESS },
    { label: "Completed", value: TaskStatus.DONE },
  ];

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filterTasks();
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load tasks: " + error,
        });
        this.loading = false;
      },
    })
  }

  filterTasks(): void {
    let filtered = [...this.tasks];

    if (this.selectedStatus !== "ALL") {
      filtered = filtered.filter((task) => task.status === this.selectedStatus);
    }

    this.filteredTasks = filtered;
  }

  onStatusFilterChange(): void {
    this.filterTasks();
  }

  clearFilters(): void {
    this.selectedStatus = "ALL";
    this.searchText = "";
    this.filterTasks();
  }

  updateTaskStatus(task: Task, newStatus: TaskStatus): void {
    if (task.status === newStatus) return;

    this.taskService.updateTaskStatus(task.id, { status: newStatus }).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === task.id);

        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.filterTasks();
        }

        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Task status updated successfully",
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to update task status: " + error,
        });
      },
    })
  }

  confirmDelete(task: Task): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this task? This action cannot be undone.`,
      header: "Delete Task",
      icon: "pi pi-exclamation-triangle",
      acceptIcon: "pi pi-trash",
      rejectIcon: "pi pi-times",
      accept: () => {
        this.deleteTask(task)
      },
      reject: () => { }
    });
  }

  private deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        this.filterTasks();
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Task deleted successfully",
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete task: " + error,
        });
      },
    })
  }

  getStatusSeverity(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.OPEN:
        return "info"
      case TaskStatus.IN_PROGRESS:
        return "warning"
      case TaskStatus.DONE:
        return "success"
      default:
        return "info"
    }
  }
}