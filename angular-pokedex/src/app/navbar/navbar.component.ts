import { Component } from '@angular/core';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
