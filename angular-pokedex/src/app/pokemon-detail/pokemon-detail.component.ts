import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MasterCardComponent } from '../components/master-card/master-card.component';
import { ProgressbarComponent } from '../components/progressbar/progressbar.component';
import { KeyvalueComponent } from '../components/keyvalue/keyvalue.component';
import { LabelComponent } from '../components/label/label.component';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    MasterCardComponent,
    ProgressbarComponent,
    KeyvalueComponent,
    LabelComponent,
    FooterNavigationComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  id!: string;
  pokemonData!: PokemonData;
  private sub: any;

  cardBgColor = 'bg-[#05091B]';

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getPokemonDetails();

    console.log(this.id);
  }

  getPokemonDetails() {
    this.api
      .getPokemonDataById(this.id!)
      .subscribe((res) => (this.pokemonData = res));
  }

  getStatsValue(name: StatType) {
    const result = this.pokemonData?.stats.find(
      (stat) => stat?.stat?.name == name
    );
    if (result) {
      return result.base_stat?.toString();
    }
    return '';
  }

  getAttackType() {
    const types: string[] = [];
    this.pokemonData?.types?.map((type) => types.push(type.type.name));

    return types.length > 2
      ? types.join(', ') + '...'
      : types.length == 2
      ? types.join(', ')
      : types;
  }

  handlePrev() {
    console.log(this.id);
    if (this.id && +this.id > 1) {
      this.id = (+this.id! - 1).toString();
    }
  }
  handleNext() {
    if (this.id) {
      this.id = (+this.id! + 1).toString();
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
