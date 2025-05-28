import { Component, EventEmitter, Output } from "@angular/core"
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { TaskService } from "../../services/task.service"
import { CreateTaskRequest } from "../../models/task.model"
import { MessageService } from "primeng/api"
import { ToastModule } from "primeng/toast"
import { ButtonModule } from "primeng/button"
import { CommonModule } from "@angular/common"

@Component({
  imports: [
    ToastModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    MessageService
  ],
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"],
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<void>();
  
  taskForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService,
  ) {
    this.taskForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", []],
    });
  }

  f(controlName: string): AbstractControl | null {
    return this.taskForm.get(controlName);
  }

  onSubmit(): void {
    if (this.taskForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const taskData: CreateTaskRequest = {
        title: this.taskForm.value.title.trim(),
        description: this.taskForm.value.description?.trim() || undefined,
      };

      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.taskForm.reset();
          this.taskCreated.emit();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Task creation error:', error);
          this.messageService.add({
            severity: "error",
            summary: "Creation Failed",
            detail: "Unable to create task. Please try again."
          });
          this.isSubmitting = false;
        },
      })
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)
      control?.markAsTouched({ onlySelf: true })
    });
  }
}