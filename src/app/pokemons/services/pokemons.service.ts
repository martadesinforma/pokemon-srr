import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

 private http = inject(HttpClient);


 //Este método se encarga de cargar una página de Pokémones. Se va a llamar en el componente pokemons-page
 public loadPage(page:number): Observable<SimplePokemon[]> {
//Validaciones
  if(page !== 0) { //cuando tenemos una página le restamos 1 porque cuando hago una peticion, la pagina con el numero 0 es la primera, ya tiene un valor, es decir, si  la peticion es esta: https://pokeapi.co/api/v2/pokemon?offset=0 (el 0 es la pagina) esto ya me devuelve una respuesta
    page = page - 1;
  }

  page = Math.max(0, page); //Esta función se utiliza para devolver el valor máximo entre dos números. En este caso, lo que hace es asegurarse de que page nunca sea menor que 0. Si page es -1, Math.max(0, -1) devolverá 0. Si page es 3, Math.max(0, 3) devolverá 3.


//petición http
  //la respuesta a la petición HTTP GET a la API de PokeAPI va a ser de tipo PokeAPIResponse, pero lo que yo quiero que  me devuelva es una respuesta de tipo SimplePokemon[], por lo que tenemos que haccer es usar el operador map() de RxJS, que te permite modificar la respuesta antes de que llegue al suscriptor del Observable.
  return this.http.get<PokeAPIResponse>( //Este return es el principal y devuelve el Observable generado por la llamada HTTP.
    `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20` //offset=${page * 20}: Esto significa que por cada página, el offset aumenta en múltiplos de 20. Por ejemplo: page = 0 -> offset=0 (primeros 20 Pokémon). page = 1 -> offset=20 (Pokémones del 21 al 40). page = 2 -> offset=40 (Pokémones del 41 al 60).
  ).pipe(
    map(resp => { //Este paso convierte cada Pokémon en un SimplePokemon, que es un objeto más simple con solo dos propiedades. El parámetro resp representa la respuesta de la API (PokeAPIResponse).
      const simplePokemons: SimplePokemon[] = resp.results.map(pokemon=> ({ //Aquí se está utilizando el método map de arrays para recorrer la propiedad results de la respuesta de la API. El propósito de este map es tomar cada objeto pokemon de ese array y transformarlo en un objeto más simple (SimplePokemon) con solo dos propiedades: id y name.
        id: pokemon.url.split('/').at(-2) ?? '', //Extraes el ID del Pokémon a partir de la URL (la URL tiene la forma https://pokeapi.co/api/v2/pokemon/1/, así que el ID es el penúltimo fragmento, que se obtiene usando split('/') y at(-2). Gracias al uso de  split('/'), cada vez que aparece una / en la cadena, se crea un nuevo elemento en el array, por lo que se obtiene este array: ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1", ""]. .at(-2) devuelve el penúltimo elemento, que en este caso es "1". Este es el ID del Pokémon que quieres extraer.
        name: pokemon.name
      }))
      return simplePokemons; //Este segundo return devuelve el array simplePokemons que luce de esta manera [{id: '1', name: 'bulbasaur'}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]. Se encuentra dentro de la función que se pasa al operador map()
    }),
  )
 };


  //Este método se encarga de cargar un pokemon en concreto. Se va a llamar en el componente pokemon-page
  public loadPokemon(id: string):  Observable<Pokemon>  {
    //petición http
      //la respuesta a la petición HTTP GET a la API de PokeAPI va a ser de tipo Pokemon.
      return this.http.get<Pokemon>( //Este return es el principal y devuelve el Observable generado por la llamada HTTP.
        `https://pokeapi.co/api/v2/pokemon/${id}`
      )
     };
}
