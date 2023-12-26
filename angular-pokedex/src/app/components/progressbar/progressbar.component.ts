import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progressbar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.css',
})
export class ProgressbarComponent {
  @Input() progress!: string;
}
