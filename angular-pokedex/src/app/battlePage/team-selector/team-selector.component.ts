import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutoCompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MasterCardComponent } from '../../components/master-card/master-card.component';
import { TitleImageComponent } from '../../components/title-image/title-image.component';
import { LabelComponent } from '../../components/label/label.component';
import { KeyvalueComponent } from '../../components/keyvalue/keyvalue.component';
import { CommonModule } from '@angular/common';
import { Subscription, map } from 'rxjs';
import { BattleInfoComponent } from '../../components/battle-info/battle-info.component';
import { ProgressbarComponent } from '../../components/progressbar/progressbar.component';

interface PokemonMoves {
  name: string;
  value: string | null;
}

type PokemonType = 'pokemon1' | 'pokemon2';

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
    BattleInfoComponent,
    ProgressbarComponent,
  ],
  templateUrl: './team-selector.component.html',
  styleUrl: './team-selector.component.css',
})
export class TeamSelectorComponent implements OnInit, OnDestroy {
  pokemon1Id!: string;
  pokemon2Id!: string;

  pokemon1Data!: PokemonData;
  pokemon2Data!: PokemonData;

  pokemon1HP!: number;
  pokemon2HP: number = +this.getStatsValue(this.pokemon2Data, 'hp');

  pokemon1Defence!: number;
  pokemon2Defence!: number;

  pokemon1moves: PokemonMoves[] = [];
  pokemon2moves: PokemonMoves[] = [];

  pokemonOptions: DropdownProps[] = [];
  subscription!: Subscription;

  isFightOn: boolean = false;
  battleLogs: string[] = [''];

  isGameOver: boolean = false;
  attackTurn: string = 'pokemon1';

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.subscription = this.route.paramMap.subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => (this.pokemon1Id = params.get('pokemon1')!)
    );

    this.getPokemonData(this.pokemon1Id.toString()).subscribe((data) => {
      this.pokemon1Data = data;

      this.pokemon1HP = +this.getStatsValue(this.pokemon1Data, 'hp');

      this.pokemon1Defence =
        +this.getStatsValue(this.pokemon1Data, 'special-defense') +
        +this.getStatsValue(this.pokemon1Data, 'defense');

      data.moves.slice(0, 4).map((move) => {
        this.getMovesStats(move.move.url).subscribe((res) => {
          this.pokemon1moves.push({
            name: move.move.name,
            value: res.power.toString(),
          });
        });
      });
    });

    this.getAllPokemonsList();
  }

  getPokemonData = (id: string) => {
    return this.api.getPokemonDataById(id);
  };

  handleDropdownSelect(id: string) {
    this.pokemon2Id = id;

    this.getPokemonData(id).subscribe((res) => {
      this.pokemon2Data = res;

      this.pokemon2HP = +this.getStatsValue(this.pokemon2Data, 'hp');

      this.pokemon2Defence =
        +this.getStatsValue(this.pokemon2Data, 'special-defense') +
        +this.getStatsValue(this.pokemon2Data, 'defense');
      [...this.pokemon2Data.moves].forEach((move) => {
        this.getMovesStats(move.move.url).subscribe((res) => {
          this.pokemon2moves.push({
            name: move.move.name,
            value: res.power.toString(),
          });
        });
      });
    });
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

  getMovesStats(url: string) {
    return this.api.getMovesDetails(url);
  }

  getMovesPower(url: string): number {
    let power: number | null = null;
    this.getMovesStats(url).subscribe((res) => (power = res.power));
    return power!;
  }

  handleFightButton() {
    this.isFightOn = !this.isFightOn;

    setInterval(() => {
      if (this.isGameOver) {
        return;
      }

      if (this.attackTurn == 'pokemon1') {
        this.handleFirstAttack();
      } else {
        this.handleSecondAttack();
      }
    }, 1500);
  }

  handleFirstAttack() {
    const pokemon1attack = this.getRandomMoves(this.pokemon1moves);

    if (this.pokemon2Defence > 0) {
      this.pokemon2Defence = this.pokemon2Defence - +pokemon1attack.value!;

      if (this.pokemon2Defence < 0) {
        this.pokemon2Defence = 0;
        this.pokemon2HP = this.pokemon2HP - Math.abs(this.pokemon2Defence);
      }
    } else {
      this.pokemon2HP =
        this.pokemon2HP - +pokemon1attack.value! > 0
          ? this.pokemon2HP - +pokemon1attack.value!
          : 0;
    }

    this.battleLogs.push(
      `Pokemon 1 attacked by ${pokemon1attack.name} and dealt a damage of ${pokemon1attack.value}`
    );

    if (this.pokemon2HP <= 0) {
      this.pokemon2HP = 0;
      this.battleLogs.push(`Game Over! ${this.pokemon1Data.name} Won`);
      this.isGameOver = true;
    }

    this.attackTurn = 'pokemon2';
  }

  handleSecondAttack() {
    const pokemon2attack = this.getRandomMoves(this.pokemon2moves);

    if (this.pokemon1Defence > 0) {
      this.pokemon1Defence = this.pokemon1Defence - +pokemon2attack.value!;

      if (this.pokemon1Defence < 0) {
        this.pokemon1Defence = 0;
        this.pokemon1HP = this.pokemon1HP - Math.abs(this.pokemon1Defence);
      }
    } else {
      this.pokemon1HP =
        this.pokemon1HP - +pokemon2attack.value! > 0
          ? this.pokemon1HP - +pokemon2attack.value!
          : 0;
    }

    this.battleLogs.push(
      `Pokemon 2 attacked by ${pokemon2attack.name} and dealt a damage of ${pokemon2attack.value}`
    );

    if (this.pokemon1HP <= 0) {
      this.pokemon1HP = 0;
      this.battleLogs.push(`Game Over! ${this.pokemon2Data.name} Won`);
      this.isGameOver = true;
    }

    this.attackTurn = 'pokemon1';
  }

  getRandomMoves(moves: PokemonMoves[]) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
