import { Component, Input } from '@angular/core';
import { StatCardComponent } from "../stat-card/stat-card.component";
import { TaskStatus, Task } from '../../models/task.model';

@Component({
  selector: 'app-stats-area',
  imports: [StatCardComponent],
  templateUrl: './stats-area.component.html',
  styleUrl: './stats-area.component.css'
})
export class StatsAreaComponent {
  taskStatus = TaskStatus;
  @Input() tasks!: Task[];

  getTaskCountByStatus(status: TaskStatus): number {
    return this.tasks.filter(task => task.status === status).length;
  }
}
