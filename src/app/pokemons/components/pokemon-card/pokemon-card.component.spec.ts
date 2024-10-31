import { provideRouter } from '@angular/router';
import { PokemonCardComponent } from './pokemon-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};


describe('PokemonCardComponent', () => { //describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.

  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;


  beforeEach(async () => { //nos permite ejecutar algún tipo de código antes de cada prueba. Va a inicializar nuestro "TestBed".
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [
        provideRouter([]),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon); //Esta línea es clave. Establece el input del componente para que pokemon sea igual a mockPokemon. De esta manera, mockPokemon se convierte en el dato que el componente recibe y usa, imitando la interacción de la aplicación real.
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges(); //Fuerza la detección de cambios para actualizar el DOM del componente con los datos proporcionados.
  });

  //esta prueba nos va a ayudar a nosotros a saber si la aplicación o nuestro componente se logra montar.Esto ayuda a saber si la inyección de dependencias está correcto
  it('should create the app', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });


  // Esta prueba verifica que el componente tiene correctamente asignada la señal pokemon
  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon); //toEqual() se utiliza para comparar el **contenido** de objetos o arrays.
  });

  //Esta prueba verifica que el nombre e imagen del Pokémon se rendericen correctamente en el HTML del componente.
  it('should render the pokemon name and image correctly', () => {
    const image = compiled.querySelector('img')!;
    expect(image).toBeDefined();

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(image.src).toBe(imageUrl);
    expect(compiled.querySelector('h2')!.textContent?.trim()).toBe(mockPokemon.name); //Verifica que el nombre del Pokémon (mockPokemon.name) esté presente en el texto del componente.
  });

  //Esta prueba revisa que el enlace de navegación (ng-reflect-router-link) esté correctamente configurado en el HTML.
  it('should have the proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div');

    expect(
      divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemon,${mockPokemon.name}`);
  });

});
