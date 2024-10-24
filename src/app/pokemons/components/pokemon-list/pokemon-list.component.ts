import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    PokemonCardComponent
],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {

  public pokemons = input.required<SimplePokemon[]>(); //va a recibir un array de simplePokemon del componente pokemons-page. En el pokemons-page.component.html hacemos la asociación: <pokemon-list [pokemons]="pokemons()"></pokemon-list>. Ahora vamos a hacer uso de este pokemons en el pokemon-list.component.html

 }
