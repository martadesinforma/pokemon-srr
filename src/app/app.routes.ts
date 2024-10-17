import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/about. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/pricing. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/contact. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
