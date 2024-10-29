
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop'; //el toSignal es para pasar de un Observable a un señal
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink,
],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);//pokemons es un array de  simplePokemons. Voy a pasarle esta señal de pokemons a mi componente pokemon-list  mediante un input.

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  //currentPage es una señal reactiva (Signal) que siempre representa el número de página actual de la url http://localhost:49543/pokemons/page/2 (en este caso seria 2). Si no existe una pagina en la url http://localhost:49543/pokemons, te devuelve un 1
  public currentPage = toSignal<number>( //el toSignal es para pasar de un Observable(lo que esta dentro de tosignal()) a un señal
    this.route.params.pipe( //params devuelve un Observable
      map(params => params['page'] ?? '1'), //Dentro de la función pasada a map(), se obtiene el valor del parámetro llamado page. Si la URL tiene algo como page/2, entonces params['page'] devolvería '2'. Si params['page'] devuelve null o undefined (lo que podría suceder si page no está presente en la URL), se utilizará el valor por defecto, en este caso '1'
      map(page =>(isNaN(+page) ? 1 : +page)), //isNaN() es una función de JavaScript que devuelve true si el valor pasado no es un número (NaN), y false si es un número. Si isNaN(+page) es true (es decir, el valor de page no puede convertirse en un número porque no existe ninguna pagina en la url), entonces devuelve 1. Si isNaN(+page) es false (es decir, page es un valor numérico válido), entonces devuelve el número convertido +page.
      map(page => Math.max(1, page)), //para que la pagina no tenga un valor negativo
    )
  );

  public loadOnPageChanged = effect(() => { // en SSR, effect() se ejecutará en el servidor solo si ocurre un cambio en las señales observadas durante la generación del HTML en el servidor.
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true, //si ustedes quieren cambiar el valor de una señal en un efecto específicamente ustedes tienen que decirle a Angular "Si, voy a permitir esa escritura en la señal en este efecto.
  })




  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page; //el valor de page se aumenta o se disminuye en 1 cuando haces click en el boton de anterior o siguinte del html

    this.pokemonsService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`))
      )
      .subscribe(pokemons => { //pokemons es un array de  simplePokemons que luce de esta manera [{id: '1', name: 'bulbasaur'}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        this.pokemons.set(pokemons);
      })
  }
}
