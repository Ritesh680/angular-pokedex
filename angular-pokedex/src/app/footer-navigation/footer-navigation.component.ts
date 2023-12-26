import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-footer-navigation',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './footer-navigation.component.html',
  styleUrl: './footer-navigation.component.css',
})
export class FooterNavigationComponent {
  @Input() id!: number;
}
