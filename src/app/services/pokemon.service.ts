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

   //mudar deixar lista mais aleatória
   getRandomPokemon(ammount:number): Observable<any[]> {//mudar
    const offset = Math.floor(Math.random() * ((151-ammount) - 1 + 1) + 1)
    const apiURL = `https://pokeapi.co/api/v2/pokemon/?limit=${ammount}&offset=${offset}`;

    return this.httpClient.get<any>(apiURL).pipe(
         map(response => response.results));
  }

  //mudar deixar lista mais aleatória
  getName(name:string): Observable<any[]> {//mudar
    const apiURL = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${name}&tl=pt&client=tw-ob`;
    return this.httpClient.get<any>(apiURL).pipe(
         map(response => response));
  }


}
