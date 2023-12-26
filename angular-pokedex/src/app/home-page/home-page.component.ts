import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainComponentComponent } from '../main-component/main-component.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, MainComponentComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
