import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input() title!: string;
  @Input() count!: number;
  @Input() iconClass!: string;

  @Input() bgGradient!: string; 
  @Input() borderColor!: string; 
  @Input() textColor!: string;   
  @Input() titleColor!: string;
}
