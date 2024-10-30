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
    fixture.componentRef.setInput('pokemon', mockPokemon);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //esta prueba nos va a ayudar a nosotros a saber si la aplicación o nuestro componente se logra montar.Esto ayuda a saber si la inyección de dependencias está correcto
  it('should create the app', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });
});
