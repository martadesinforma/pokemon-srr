import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  //La prueba verifica que el componente se crea correctamente  incluso si recibe una lista vacía de Pokémon.
  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []); //Configura el input del componente con una lista vacía (pokemons = []). Esto simula un caso en el que no hay Pokémon para mostrar.
    fixture.detectChanges();
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente y que no haya errores en su inicialización.
  });

  //La prueba verifica que el componente renderiza un pokemon-card para cada Pokémon en la lista pokemons.
  it('should render the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons); //Configura el input pokemons con una lista mockPokemons que contiene datos de Pokémon simulados.
    fixture.detectChanges();

    expect(compiled.querySelectorAll('pokemon-card').length).toBe(
      mockPokemons.length
    ); //Cuenta los elementos pokemon-card en el HTML renderizado del componente y verifica que su cantidad coincida con la longitud de mockPokemons. Esto asegura que cada Pokémon en mockPokemons se representa con una tarjeta pokemon-card en el DOM
  });

  // La prueba asegura que el componente muestre el mensaje "No hay pokémons" cuando la lista pokemons está vacía.
  it('should render "No hay pokémons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    expect(compiled.querySelector('div')?.textContent).toContain(
      'No hay pokemons'
    );
  });
});
