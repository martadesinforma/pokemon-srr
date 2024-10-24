
import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [

  ],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {

  public pokemon = input.required<SimplePokemon>(); //va a recibir un  simplePokemon del componente pokemon-list. En el pokemon-list.component.html hacemos la asociación:<pokemon-card [pokemon]="pokemon"></pokemon-card>. Este input lo estoy recibiendo directamente del pokemon-list.component.html, no del pokemon-list.component.ts Ahora vamos a hacer uso de este pokemon en el pokemon-card.component.html

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  )


}
