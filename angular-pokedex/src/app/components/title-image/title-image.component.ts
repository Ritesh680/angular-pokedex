import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-image',
  standalone: true,
  imports: [],
  templateUrl: './title-image.component.html',
  styleUrl: './title-image.component.css',
})
export class TitleImageComponent {
  @Input() imgSrc: string|undefined = '';
}
