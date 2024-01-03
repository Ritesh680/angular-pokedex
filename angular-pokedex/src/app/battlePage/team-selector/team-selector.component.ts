import { Component, OnInit } from '@angular/core';
import { AutoCompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MasterCardComponent } from '../../components/master-card/master-card.component';
import { TitleImageComponent } from '../../components/title-image/title-image.component';
import { LabelComponent } from '../../components/label/label.component';
import { KeyvalueComponent } from '../../components/keyvalue/keyvalue.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-selector',
  standalone: true,
  imports: [
    CommonModule,
    MasterCardComponent,
    AutoCompleteComponent,
    TitleImageComponent,
    LabelComponent,
    KeyvalueComponent,
  ],
  templateUrl: './team-selector.component.html',
  styleUrl: './team-selector.component.css',
})
export class TeamSelectorComponent implements OnInit {
  pokemon1Id!: string;
  pokemon2Id!: string;

  pokemon1Data!: PokemonData;
  pokemon2Data!: PokemonData;

  pokemonOptions: DropdownProps[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {
    // this.route.paramMap.subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => (this.pokemon1Id = params.get('pokemon1')!)
    );

    this.getPokemonData(this.pokemon1Id.toString()).subscribe(
      (data) => (this.pokemon1Data = data)
    );

    this.getAllPokemonsList();
  }

  getPokemonData = (id: string) => {
    return this.api.getPokemonDataById(id);
  };

  handleDropdownSelect(id: string) {
    this.pokemon2Id = id;

    return this.getPokemonData(id).subscribe(
      (res) => (this.pokemon2Data = res)
    );
  }
  getStatsValue(pokemonData: PokemonData, name: StatType) {
    const result = pokemonData?.stats.find((stat) => stat?.stat?.name == name);
    if (result) {
      return result.base_stat?.toString();
    }
    return '';
  }

  getIdFromUrl(url: string) {
    const res = url.split('/');
    return res[res.length - 2] as string;
  }

  getAllPokemonsList() {
    return this.api.getAllPokemons(0, 20).subscribe((data) => {
      let tempData: DropdownProps[] = [];
      data.results.map((res) => {
        tempData.push({ label: res.name, value: this.getIdFromUrl(res.url) });
      });
      this.pokemonOptions = tempData;
    });
  }
}
