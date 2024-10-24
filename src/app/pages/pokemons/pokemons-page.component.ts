
import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent
],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit{

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);//pokemons es un array de  simplePokemons. Voy a pasarle esta señal de pokemons a mi componente pokemon-list  mediante un input.


  //Durante SSR, Angular espera a que todas las tareas dentro de ngOnInit y otros ciclos de vida sean completadas antes de considerar la aplicación en modo "stable". Solo cuando el ngOnInit ha terminado y Angular ya no espera más eventos asincrónicos o promesas, considera que el componente ha alcanzado el estado "stable" y entonces genera el HTML final para enviarlo al cliente.
  ngOnInit(): void {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    this.pokemonsService.loadPage(page)
      .subscribe(pokemons => { //pokemons es un array de  simplePokemons que luce de esta manera [{id: '1', name: 'bulbasaur'}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        this.pokemons.set(pokemons);
        console.log('desde el navegador', pokemons);
      })
  }
}
