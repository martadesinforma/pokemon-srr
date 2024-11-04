import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { SimplePokemon } from "../interfaces/simple-pokemon.interface";
import { PokeAPIResponse } from "../interfaces/pokemon-api.response";
import { catchError } from "rxjs";

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  //TODO: Otros campos de la interfaz Pokemon según sea necesario
};

describe('PokemonsService', () => {//describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.

  let service: PokemonsService; //Aún no se le asigna un valor, pero esto se hará en el bloque beforeEach().
  let httpMock: HttpTestingController;

  beforeEach(() => { //nos permite ejecutar algún tipo de código antes de cada prueba.
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()], //provideHttpClient(): Proporciona el servicio HttpClient y provideHttpClientTesting(): Configura HttpClientTestingModule para interceptar llamadas HTTP y simularlas sin hacer solicitudes reales a una API.
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController); //Inyecta HttpTestingController en httpMock, permitiendo interceptar y verificar solicitudes HTTP realizadas por el servicio.
  });

  afterEach(() => { //Ejecuta este bloque de código después de cada prueba. Aquí, se llama a httpMock.verify() para asegurar que todas las solicitudes HTTP realizadas en una prueba específica hayan sido controladas.
    httpMock.verify();
  });


  // Este código está verificando que el servicio pOKEMONSService ha sido creado correctamente.
  it('should be created', () => {
    expect(service).toBeTruthy(); //verifica que se haya creado una instancia válida del servicio.
  });


  //Esta prueba para el método loadPage de PokemonsService verifica que una solicitud HTTP se realice correctamente y que la respuesta se procese adecuadamente sin necesidad de hacer una llamada HTTP real. La prueba no necesita ser async porque el flush de httpMock devuelve la respuesta de manera sincrónica. Al llamar a req.flush(mockPokeApiResponse), la respuesta simulada se emite de inmediato
  it('should load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne( //se espera una solicitud a la URL exacta que correspondería a la primera página de Pokemons
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe('GET'); //Verifica que la solicitud interceptada sea un método GET, confirmando que loadPage esté solicitando datos de manera correcta.

    req.flush(mockPokeApiResponse); //Envía un mock de respuesta a la solicitud HTTP interceptada. En este caso, se simula que la API responde con mockPokeApiResponse, sin necesidad de llamar a la API real. Al llamar a req.flush(mockPokeApiResponse), la respuesta simulada se emite de inmediato, por lo que el bloque de código de la suscripción subscribe se ejecuta. Este código hace que la petición se complete y entrega el resultado.
  });


  it('should load page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne( //en la url aparece offset=80 porque al estar en la pagina 5 le restamos 1 y a ese 4 lo multiplicamos x 20, segun la lógica de loadPage()
      `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });


  //Esta prueba verifica que el método loadPokemon de PokemonsService realice una solicitud HTTP GET con el ID especificado, y que al recibir una respuesta, el resultado coincida con el objeto mockPokemon esperado.
  it('should load a Pokémon by ID', () => {
    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });


  //Esta prueba verifica que el método loadPokemon de PokemonsService realice una solicitud HTTP GET con el nombre del Pokémon especificado, y que la respuesta coincida con el objeto mockPokemon esperado.
  it('should load a Pokémon by Name', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });


  // Esta prueba verifica que cuando loadPokemon se llama con un nombre de Pokémon inexistente, el servicio maneje el error correctamente: se realiza una solicitud HTTP GET, que retorna un error 404 simulado, y la prueba confirma que el mensaje de error contiene "Pokémon not found".
  it('should catch error if pokémon not found', () => {
    const pokemonName = 'yo-no-existo';

    service
      .loadPokemon(pokemonName)
      .pipe(
        catchError((err) => { //intercepta el error en caso de que la solicitud falle. Aquí, catchError recibe una función de manejo de errores que recibe err, el objeto de error generado por la llamada HTTP.
          expect(err.message).toContain('Pokémon not found');
          return [];
        })
      )
      .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('Pokémon not found', { //simula una respuesta de error HTTP 404. Este error simulado activa el catchError, permitiendo evaluar la respuesta de manejo del error.
      status: 404,
      statusText: 'Not Found',
    });
  });


})

