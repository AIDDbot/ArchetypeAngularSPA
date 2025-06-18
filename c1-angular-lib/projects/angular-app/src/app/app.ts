import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <span> <a [routerLink]="['/']" [queryParams]="{ st: 'AAPL' }">AAPL</a></span>
    <span> <a [routerLink]="['/']" [queryParams]="{ st: 'GOOG' }">GOOG</a></span>
    <span> <a [routerLink]="['/']" [queryParams]="{ st: 'MSFT' }">MSFT</a></span>
    <span> <a [routerLink]="['/']" [queryParams]="{ st: 'AMZN' }">AMZN</a></span>
    <span> <a [routerLink]="['/']" [queryParams]="{ st: 'TSLA' }">TSLA</a></span>

    <router-outlet />
  `,
})
export class App {
  protected title = 'angular-app';
}
