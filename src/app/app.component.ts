import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { interval, Observable, lastValueFrom, Subscription } from 'rxjs';

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
  classico = false;
  step = 0;
  time = 0;
  subscription = new Subscription();
  total = 0;
  kanto = true;
  johto = true;
  hoenn = true;
  sinnoh = true;
  unova = true;
  kalos = true;
  alola = true;
  paldea = true;

  timer$ = interval(1000);
  seconds = 0;

  async start() {
    this.subscription = this.timer$.subscribe(async () => {
      this.time--;
  
      if(this.time == 0){
        await this.stop();

        if(this.step == 3)
          this.step = 5;
      }
    });
  }

  async stop() {
    // Unsubscribe to stop the timer
    await this.subscription.unsubscribe();
  }

  async goNextStep(newStep:number){
    this.step = newStep;
    this.classico = this.step == 3;
    this.loading = false;
    this.revealed = false;
    this.errou = false;
    this.acertou = false;
    this.total = 0;
    this.score = 0;
    
    if(this.step != 0)
    {
      this.gerarLista();
    }
    else{
      this.stop();
    }
   
    if(this.classico){
      this.time = 60;
      this.start();
    }
  }

  async pegarPokemon(){
    const articles$ = this.contactService.getOneRandomPokemon(this.kanto, this.johto, this.hoenn, this.sinnoh, this.unova, this.kalos, this.alola, this.paldea);
    this.pokemon = await lastValueFrom(articles$);
  }

  async pegarPokemonsAleatorios(){
    const articles$ = this.contactService.getRandomPokemon(3);
    this.randomPokemonList = await lastValueFrom(articles$);
  }

  async selectPokemon(name:string){
    this.revealed = true;
    this.total ++;
    
    if(this.pokemon.name==name){
      this.score++;
      this.acertou = true;
    }else{
      this.errou = true;
    }

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

    this.goNextStep(this.classico ? 3 : 4);
  }

}

