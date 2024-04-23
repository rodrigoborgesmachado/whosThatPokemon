import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) {}

  // Define regions and their corresponding intervals
  regions = [
    [1, 152],
    [153, 251],
    [252, 385],
    [386, 488],
    [489, 649],
    [650, 718],
    [719, 777],
    [906, 996]
  ];

  index: number[]=[];

  getPokemonById(id:number): Observable<any[]> {
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${id}`;

   return this.httpClient.get<any>(apiURL).pipe(
        map(response => response));
  }

   //mudar deixar lista mais aleatória
  getRandomPokemon(ammount:number): Observable<any[]> {
    const offset = Math.floor(Math.random() * ((151-ammount) - 1 + 1) + 1)
    const apiURL = `https://pokeapi.co/api/v2/pokemon/?limit=${ammount}&offset=${offset}`;

    return this.httpClient.get<any>(apiURL).pipe(
         map(response => response.results));
  }

  // Function to generate a random number within a given range
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getOneRandomPokemon(kanto:boolean, johto:boolean, hoenn:boolean, sinnoh:boolean, unova:boolean, kalos:boolean, alola:boolean, paldea:boolean): Observable<any[]> {
    this.index = [];
    if(kanto)
    {
      this.index.push(0);
    }
    if(johto){
      this.index.push(1);
    }
    if(hoenn){
      this.index.push(2);
    }
    if(sinnoh){
      this.index.push(3);
    }
    if(unova){
      this.index.push(4);
    }
    if(kalos){
      this.index.push(5);
    }
    if(alola){
      this.index.push(6);
    }
    if(paldea){
      this.index.push(7);
    }

    const i = this.getRandomInt(0, this.index.length-1);
    const id = this.getRandomInt(this.regions[i][0], this.regions[i][1]);

    return this.getPokemonById(id);
  }

  //mudar deixar lista mais aleatória
  getName(name:string): Observable<any[]> {//mudar
    const apiURL = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${name}&tl=pt&client=tw-ob`;
    return this.httpClient.get<any>(apiURL).pipe(
         map(response => response));
  }


}
