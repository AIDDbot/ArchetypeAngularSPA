import { Component, signal } from '@angular/core';
import { SearchComponent } from '../../../angular-lib/src/lib/search/search.component';

@Component({
  selector: 'app-root',
  imports: [SearchComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <lib-search [(searchTerm)]="searchTerm" />
    <p>Search term: {{ searchTerm() }}</p>
  `,
})
export class App {
  protected title = 'angular-app';
  protected searchTerm = signal<string>('Initial value');
}
