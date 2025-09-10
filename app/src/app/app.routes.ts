import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'vinos',
    loadComponent: () => import('./pages/vinos/vinos.component').then(m => m.VinosComponent)
  },
  { path: '**', redirectTo: '/home' }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // siempre va al inicio al navegar
  anchorScrolling: 'enabled',           // habilita fragmentos #top
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
