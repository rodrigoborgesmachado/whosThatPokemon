import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) {}

  getPokemonById(id:number): Observable<any[]> {//mudar
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${id}`;

   return this.httpClient.get<any>(apiURL).pipe(
        map(response => response));
  }

}
