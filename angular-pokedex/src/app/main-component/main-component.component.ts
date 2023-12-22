import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { ApiService } from '../services/api.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [CardComponent, InfiniteScrollModule],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.css',
})
export class MainComponentComponent implements OnInit {
  pokemons: Result[] = [];
  offset = 0;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getPokemons();
  }
  onScrollDown() {
    this.offset = this.offset + 20;
    this.getPokemons();
  }

  getPokemons() {
    this.api.getAllPokemons(this.offset).subscribe((res) => {
      const pokemonData = [...this.pokemons];
      res.results.forEach((d) => pokemonData.push(d));

      this.pokemons = pokemonData;
    });
  }
}
