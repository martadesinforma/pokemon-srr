import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/pokemons. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal. Podemos llegar hasta esta url cuando hacemos click en el enlace Pokemons del navbar.component.html
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/pokemon/id. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal. Podemos llegar hasta esta url cuando hacemos click en cualquiera de las tarjetas del pokemon-card.component.html
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/about. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal. Podemos llegar hasta esta url cuando hacemos click en el enlace About del navbar.
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/pricing. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal. Podemos llegar hasta esta url cuando hacemos click en el enlace Pricing del navbar.
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/contact. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal. Podemos llegar hasta esta url cuando hacemos click en el enlace Contact del navbar.
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
