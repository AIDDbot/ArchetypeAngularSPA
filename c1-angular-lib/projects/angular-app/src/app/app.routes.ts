import { Routes } from '@angular/router';
import StocksComponent from './stocks/stocks.component';

export const routes: Routes = [
  {
    path: '',
    component: StocksComponent,
  },
  {
    path: 'stocks/:st',
    loadComponent: () => import('./stocks/stocks.component'),
  },
];
