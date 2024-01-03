import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-battle-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle-info.component.html',
  styleUrl: './battle-info.component.css',
})
export class BattleInfoComponent {
  @Input({ required: true }) battleLogs: string[] = [];
}
