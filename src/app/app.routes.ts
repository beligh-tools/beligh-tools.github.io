import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent) },
  { path: 'expenses', loadComponent: () => import('./pages/expenses/expenses.component').then(c => c.ExpensesComponent) },
  { path: 'weather', loadComponent: () => import('./pages/weather/weather.component').then(c => c.WeatherComponent) },
  { path: 'charts', loadComponent: () => import('./pages/charts/charts.component').then(c => c.ChartsComponent) },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
