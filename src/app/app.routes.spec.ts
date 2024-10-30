import { TestBed } from "@angular/core/testing"
import { routes } from "./app.routes"
import { provideRouter, Router } from "@angular/router"
import { Location } from "@angular/common";

describe('App Routes', () => {

  let router: Router; //Router: Se utiliza para simular la navegación entre rutas en las pruebas.
  let location: Location; //Location: Permite verificar la URL actual después de la navegación, ayudando a confirmar que la navegación redirige a la ruta correcta.

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router) // Inyecta el Router configurado para que esté disponible en las pruebas.
    location = TestBed.inject(Location) // Inyecta Location
  });

  //Define la prueba. En este caso, se verifica que navegar a about redirige correctamente a /about.
  it('should navigate to "about" redirects to "/about"', async() =>{
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  //Define la prueba. En este caso, se verifica que navegar a pokemons/page/1 redirige correctamente a /pokemons/page/1.
  it('should navigate to "pokemons/page/1" redirects to "/pokemons/page/1"', async() =>{
    await router.navigate(['pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

   //Define la prueba. En este caso, se verifica que navegar a unknow-page redirige correctamente a /about.
   it('should navigate to "unknow-page" redirects to "about"', async() =>{
    await router.navigate(['unknow-page']);
    expect(location.path()).toBe('/about');
  });

  //Esta prueba verifica que, cuando se navega a determinadas rutas (en este caso, 'about' y 'pokemons/page/:page'), se cargan los componentes correctos.
  it('should load the proper component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!; //const aboutRoute = routes.find((route) => route.path === 'about')!;: Busca en routes la ruta que tiene el path igual a 'about'. Si se encuentra, devuelve la ruta
    expect(aboutRoute).toBeDefined(); //Verifica que aboutRoute esté definido, asegurándose de que la ruta 'about' exista en el archivo app.routes.ts.
    const aboutComponent = (await aboutRoute.loadComponent!()) as any; //Llama a la función loadComponent de la ruta about para cargar dinámicamente el componente asociado
    expect(aboutComponent.default.name).toBe('AboutPageComponent'); //Verifica que el componente cargado sea el esperado, en este caso AboutPageComponent. La propiedad default.name se usa porque la importación se realiza con default en el archivo del componente, y .name proporciona el nombre de la clase del componente.

    const pokemonPageRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
    expect(pokemonPageRoute).toBeDefined();
    const pokemonPage = (await pokemonPageRoute.loadComponent!()) as any;
    expect(pokemonPage.default.name).toBe('PokemonsPageComponent');
  });
})
