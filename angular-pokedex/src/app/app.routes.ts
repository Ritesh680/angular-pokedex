import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TeamSelectorComponent } from './battlePage/team-selector/team-selector.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'pokemon/:id', pathMatch: 'full', component: PokemonDetailComponent },
  { path: 'battle', component: TeamSelectorComponent },
  { path: '**', component: ErrorPageComponent },
];
