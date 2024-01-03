import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-keyvalue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyvalue.component.html',
  styleUrl: './keyvalue.component.css',
})
export class KeyvalueComponent {
  @Input() label!: string;
  @Input() value!: string;
  @Input() extraStyles: string | undefined;
}
