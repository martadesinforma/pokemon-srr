import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {

  private pokemonsService = inject(PokemonsService);
  private activatedRoute = inject(ActivatedRoute); //Este servicio permite acceder a los parámetros de la URL y a otros datos relacionados con la ruta en la que se encuentra el componente.

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id'); //Utiliza snapshot.paramMap.get('id') para obtener el valor del parámetro id directamente desde la URL en el momento en que se carga el componente.
    if(!id) return;

    this.pokemonsService.loadPokemon(id)
      .subscribe(pokemon => this.pokemon.set(pokemon));

  }


}
