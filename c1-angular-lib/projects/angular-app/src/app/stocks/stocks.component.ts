import { Component, signal } from '@angular/core';
import { SearchComponent } from '../../../../angular-lib/src/lib/search/search.component';

@Component({
  selector: 'app-stocks',
  imports: [SearchComponent],
  template: `
    <lib-search [(searchTerm)]="searchTerm" />
    <p>Search term: {{ searchTerm() }}</p>
  `,
})
export default class StocksComponent {
  protected searchTerm = signal<string>('AAPL');
}
