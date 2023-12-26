import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-master-card',
  standalone: true,
  imports: [],
  templateUrl: './master-card.component.html',
  styleUrl: './master-card.component.css',
})
export class MasterCardComponent {
  @Input() bgColor!: string;
}
