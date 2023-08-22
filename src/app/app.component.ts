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

  constructor(private contactService: PokemonService) { }

  pokemon:any;
  randomPokemonList:any;
  pokemonOptionsList:any;
  score = 0;
  loading = false;

  async pegarPokemon(){
    const id = Math.floor(Math.random() * (151 - 1 + 1) + 1)
    const articles$ = this.contactService.getPokemonById(id);
    this.pokemon = await lastValueFrom(articles$);
  }

  //mudar deixar lista mais aleatória
  async pegarPokemonsAleatorios(){
    const articles$ = this.contactService.getRandomPokemon(3);
    this.randomPokemonList = await lastValueFrom(articles$);
    console.log(this.randomPokemonList);
  }

  playSomQuem(){
    let audio = new Audio();
    audio.src = "../assets/audio/br-quem.mp3";
    audio.load();
    audio.play();
  }

  async selectPokemon(name:string){

    //https://translate.google.com.vn/translate_tts?ie=UTF-8&q=Pikachu&tl=pt&client=tw-ob

    if(this.pokemon.name==name){
      this.score++;
    }else{

    }

    this.gerarLista();

    //let audio = new Audio();
    //let audio2 = new Audio();
    //audio.src = "../assets/audio/br-eh.mp3";
    //audio2.src = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=Pikachu&tl=pt&client=tw-ob";
    //audio.load();
    //const articles$ = this.contactService.getName(this.pokemon.name);
    //let audio123 = await lastValueFrom(articles$);

    //debugger;
    

    //audio.play();
    //audio2.load();
    //audio2.play();
  }

  async gerarLista(){
    this.loading=true;
    
    await this.pegarPokemon();
    await this.pegarPokemonsAleatorios();

    this.pokemonOptionsList = this.randomPokemonList.map((x: { name: any; })=>{return x.name});
    this.pokemonOptionsList.splice((this.pokemonOptionsList.length+1) * Math.random() | 0, 0, this.pokemon.name);
    this.loading = false;
    this.playSomQuem();
  }


}

