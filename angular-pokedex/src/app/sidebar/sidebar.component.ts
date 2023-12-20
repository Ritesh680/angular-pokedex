import { Component } from '@angular/core';
import { DropdownComponent } from '../components/dropdown/dropdown.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  options = [
    { label: 'one', value: 1 },
    { label: 'two', value: 2 },
  ];
}
