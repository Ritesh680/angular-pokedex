import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progressbar',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.css',
})
export class ProgressbarComponent {
  @Input({ required: true }) progress!: string;
  @Input() extraStyles!: string;
}
