import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => { //describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;

  //Declaración del Mock NavbarComponentMock: Es un componente vacío que simula el NavbarComponent real. Al tener el mismo selector, cumple con el requisito de renderización en AppComponent
  @Component({
    selector: 'app-navbar',
    standalone: true,
  })
  class NavbarComponentMock { }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
      ]
    }).overrideComponent(AppComponent, { //Aquí se utiliza la función .overrideComponent() para reemplazar el NavbarComponent real por un componente mock (NavbarComponentMock) en el test de AppComponent. Este enfoque permite que AppComponent se pruebe sin depender de la implementación interna de NavbarComponent
      add: {
        imports: [NavbarComponentMock]
      },
      remove: {
        imports: [NavbarComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  //esta prueba nos va a ayudar a nosotros a saber si la aplicación o nuestro componente se logra montar.Esto ayuda a saber si la inyección de dependencias está correcto
  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //Esta prueba verifica que el componente renderice correctamente el <app-navbar> y el <router-outlet>.
  it(`should render the navbar and route-outlet`, () => {
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

});
