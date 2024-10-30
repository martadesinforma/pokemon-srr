## Pasos a seguir para hacer uso de este proyecto

 1. Clonar el proyecto
 2. Ejecutar ```npm install``` 
 3. Ejecutar la app ```ng serve -o```
 4. Para generar los archivos de producción lanzar `ng build`.
 5. Para levantar un servidor que maneje la renderización del lado del servidor lanzar `npm run serve:ssr:pokemon-ssr`.




# Este es un breve listado del contenido del proyecto:

1. Uso de Standalone components

2. Tailwind: Para instalarlo, hemos escrito en la terminal ` npm install -D tailwindcss postcss autoprefixer` y `npx tailwindcss init`. En el archivo tailwind.config.js que se ha creado tenemos que copiar este codigo `"./src/**/*.{html,ts}"`. En el archivo styles.css tenemos que copiar este codigo `@tailwind base; @tailwind components; @tailwind utilities`. Ahora en la terminal cancelamos el ng serve-o que habíamos lanzado al principio cuando comienzas el proyecto y lo vuelves a lanzar.

3. Convertir una SPA en un SSR lanzando el comando `ng add @angular/ssr`.

4. Para establecer el título de la página dinamicamente en el navegador y etiquetas metatags, hemos agregado un ngOnInit() en cada ts de cada página.

5. Uso de servicio. El método loadPage() definido en el servicio pokemons.service.ts se va a inyectar en el componente pokemons-page y el método loadPokemon() definido en el servicio pokemons.service.ts se va a inyectar en el componente pokemon-page. Como en el método loadPage() hemos inyectado HttpClient, en el archivo `app.config.ts` tenemos que agregar en los providers este código `provideHttpClient(withFetch())` para no tener un error por consola. 

6. Uso de input(): En el componente pokemons-page, el servicio nos retorna un array de simplePokemons que vamos a guardar en la variable pokemons (es una señal). Voy a  pasarle esta señal de pokemons a mi componente pokemon-list  mediante un input. En el pokemons-page.component.html hacemos la asociación: `<pokemon-list [pokemons]="pokemons()"></pokemon-list>`. Después vamos a hacer uso de este pokemons en el pokemon-list.component.html. Tambien voy a pasarle a mi componente pokemon-card el valor de pokemon mediante un input(). Este valor lo voy a recibir del pokemon-list.component.html. Después vamos a hacer uso de este pokemon en el pokemon-card.component.html.

7. uso de queryParamMap (injectando ActivatedRoute) y del Router en el componente pokemons-page.

8. Agregar una animación personalizada  en Tailwind CSS al modificar el archivo tailwind.config.js: Esta modificación en el archivo tailwind.config.js permite agregar una animación personalizada llamada fadeIn a tu proyecto. Luego vamos a conseguir agregar esta animacion escribiendo la clase animate-fadeIn en el selector que quiera, en este caso, en el div del pokemon-card.component.html

9. @let se utiliza para crear  variables en el html. Se va a utilizar en el pokemon-page.component.html

10. SSG + SSR en Angular: Ahora que hemos cambiado la estructura de la URL a `/pokemons/page/:page`, el prerenderizado ya no puede tratar la URL como una ruta estática única (`/pokemons`). En lugar de ello, Angular interpreta `/pokemons/page/:page` como una ruta dinámica, que depende del valor `page` para decidir qué debe prerenderizar. Como el prerenderizado de SSG necesita rutas fijas (como `/pokemons/page/1`, `/pokemons/page/2`, etc.), Angular no sabe qué rutas específicas construir a menos que las especifiques explícitamente. Para hacer esa configuración, nosotros tenemos que crearnos un archivo llamado "routes.txt" en el root de nuestra aplicación, en el cual tenemos todas las rutas de los argumentos dinámicos. Angular va a verificar este archivo de "routes" y esos van a ser generados de manera estática. Esto le indicará a Angular que cree contenido estático para cada página específica, como `/pokemons/page/1`, `/pokemons/page/2`, y así sucesivamente. En el angular.json tambien tenemos que hacer una modificacion en el prerender.

11. Construir archivo de Routes.txt dinámicamente: Vamos a crearnos una carpeta que se llame "scripts" en el root de mi proyecto. Dentro de "scripts" voy a crearme un nuevo archivo que se va a llamar "prerender-routes.js". Es un simple archivo de JavaScript. Ahora en el package.json añadimos un nuevo script y lo agregamos al build. Ahora si lanzamos el comando `ng build` por la consola del vsc,  en la carpeta de distribución  ya me ha hecho el prerendering de pokemons y vamos a ver como nos ha creado el prerender de los pokemons

12. Testing: Hacemos testing en el componente app, app.routes, pokemon-card,

# Estructura de esta aplicación:

- Carpeta pages:
  1. Componente about-page
  2. Componente contact-page
  3. Componente pricing-page
  4. Componente pokemon-page 
  5. Componente pokemons-page 
  6. Componente pokemon-list.skeleton (en la carpeta ui dentro de la carpeta pokemons)

- Carpeta pokemons:
  1. Componente pokemon-list (En la carpeta components)
  2. Componente pokemon-card (En la carpeta components)
  3. pokemons service (En la carpeta services)
  4. simple-pokemon interface (En la carpeta interfaces)
  5. pokemon-api.response.ts (En la carpeta interfaces)
  6. pokemon.interface.ts (En la carpeta interfaces)
  
- Carpeta shared:
  1. Componente navbar

- Carpeta scripts:
  1. prerender-routes.js

- routes.txt
