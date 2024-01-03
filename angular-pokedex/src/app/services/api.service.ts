import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private httpClient: HttpClient) {}

  getAllPokemons(offset = 0, limit = 20): Observable<GetPokemons> {
    return this.httpClient.get<GetPokemons>(
      this.apiUrl + `/pokemon?offset=${offset}&limit=${limit}`
    );
  }
  getApiData<T>(api: string): Observable<T> {
    const res = this.httpClient.get<T>(api);
    return res;
  }
  getPokemonDataById(id: string): Observable<PokemonData> {
    return this.httpClient.get<PokemonData>(this.apiUrl + `/pokemon/${id}`);
  }
  getMovesDetails(url: string): Observable<MoveDetails> {
    return this.httpClient.get<MoveDetails>(url);
  }
}
