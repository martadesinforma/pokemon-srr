import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

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
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id'); //Utiliza snapshot.paramMap.get('id') para obtener el valor del parámetro id directamente desde la URL en el momento en que se carga el componente.
    if(!id) return;

    this.pokemonsService.loadPokemon(id)
    .pipe(
      tap(pokemon => {
        this.title.setTitle(`${pokemon.id} - ${pokemon.name}`);
        this.meta.updateTag({name: 'description', content:`Página del pokémon ${pokemon.name}`});
        this.meta.updateTag({name: 'og:title', content:`${pokemon.name}`});
        this.meta.updateTag({name: 'og:description', content:`Página del pokémon ${pokemon.name}`});
        this.meta.updateTag({name: 'og:image', content:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`})
      })
    )
      .subscribe(pokemon => this.pokemon.set(pokemon));

  }


}
