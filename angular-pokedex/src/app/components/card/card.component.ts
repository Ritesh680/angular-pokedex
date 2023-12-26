import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class CardComponent implements OnInit {
  @Input() pokemon!: Result;
  title!: string;
  subtitle!: string;
  details = 'hahahahaha';
  url!: string;
  pokemonData!: PokemonData;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.title = this.pokemon.name;
    this.url = this.pokemon.url;

    this.api.getApiData<PokemonData>(this.url).subscribe((res) => {
      return (this.pokemonData = res);
    });
  }
}
