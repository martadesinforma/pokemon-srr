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

SEO Tags

Petición HTTP que construye la metadata.

Enlaces que muestren metadata

Paginación híbrida

Despliegues


# Estructura de esta aplicación:

- Carpeta pages:
  1. Componente about
  2. Componente contact
  3. Componente pricing
  4. Componente pokemons 
  5. Componente pokemon-list.skeleton (en la carpeta ui dentro de la carpeta pokemons)

- Carpeta pokemons:
  1. Componente pokemon-list
  2. Componente pokemon-card

- Carpeta shared:
  1. Componente navbar
