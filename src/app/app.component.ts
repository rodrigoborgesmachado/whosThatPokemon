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

  async pegarPokemon(){
    const id = Math.floor(Math.random() * (151 - 1 + 1) + 1)
    const articles$ = this.contactService.getPokemonById(id);
    this.pokemon = await lastValueFrom(articles$);
    console.log(this.pokemon);
  }


}

