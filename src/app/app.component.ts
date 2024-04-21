import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'whosThatPokemon';

  constructor(private contactService: PokemonService) {
    this.gerarLista();

   }

  pokemon:any;
  randomPokemonList:any;
  pokemonOptionsList:any;
  score = 0;
  loading = false;
  revealed = false;
  errou = false;
  acertou = false;

  async pegarPokemon(){
    const id = Math.floor(Math.random() * (151 - 1 + 1) + 1)
    const articles$ = this.contactService.getPokemonById(id);
    this.pokemon = await lastValueFrom(articles$);
  }

  async pegarPokemonsAleatorios(){
    const articles$ = this.contactService.getRandomPokemon(3);
    this.randomPokemonList = await lastValueFrom(articles$);
  }

  async selectPokemon(name:string){

    if(this.pokemon.name==name){
      this.score++;
      this.acertou = true;
    }else{
      this.errou = true;
    }

    this.revealed = true;
  }

  async gerarLista(){
    this.loading=true;
    this.acertou = false;
    this.errou = false;
    this.revealed = false;
    
    await this.pegarPokemon();
    await this.pegarPokemonsAleatorios();

    this.pokemonOptionsList = this.randomPokemonList.map((x: { name: any; })=>{return x.name});
    this.pokemonOptionsList.splice((this.pokemonOptionsList.length+1) * Math.random() | 0, 0, this.pokemon.name);
    this.loading = false;
  }

  async reiniciar(){
    this.score = 0;

    this.gerarLista();
  }

}

