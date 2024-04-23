import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SunSaleService {

  constructor(private httpClient: HttpClient) {}

  getRanking(): Observable<any[]> {
   console.log('here');
   const apiURL = `https://apisunsale.azurewebsites.net/api/WhosThatPokemonResult/ranking`;

   const response = this.httpClient.get<any>(apiURL);

   console.log(response);
   return response;
  }

  async postRanking(nome:string, tempo: number, acertos: number, erros: number, kanto:boolean, johto:boolean, hoenn:boolean, sinnoh:boolean, unova:boolean, kalos:boolean, alola:boolean, paldea:boolean){

    const body = {
      "nome": nome,
      "tempo": tempo,
      "acertos": acertos,
      "erros": erros,
      "kanto": kanto ? "1" : "0",
      "johto": johto ? "1" : "0",
      "hoenn": hoenn ? "1" : "0",
      "sinnoh": sinnoh ? "1" : "0",
      "unova": unova ? "1" : "0",
      "kalos": kalos ? "1" : "0",
      "alola": alola ? "1" : "0",
      "paldea": paldea ? "1" : "0"
    }

    const apiURL = `https://apisunsale.azurewebsites.net/api/WhosThatPokemonResult`;

    try {
      const response = await this.httpClient.post(apiURL, body).toPromise();
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  }

}
