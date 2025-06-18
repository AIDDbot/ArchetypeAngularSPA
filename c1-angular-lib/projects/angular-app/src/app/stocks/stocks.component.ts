import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, input, linkedSignal } from '@angular/core';
import { SearchComponent } from '../../../../angular-lib/src/lib/search/search.component';

// Source path
// import { SearchComponent } from '../../../../angular-lib/src/lib/search/search.component';

// Node Modules
// import { SearchComponent } from '@softtek/angular-lib';

@Component({
  selector: 'app-stocks',
  imports: [SearchComponent, JsonPipe],
  template: `
    <lib-search [(searchTerm)]="searchTerm" />
    <p>Search term: {{ searchTerm() }}</p>
    @switch (stockResource.status()) {
      @case ('resolved') {
        <pre>{{ stockResource.value() | json }}</pre>
      }
      @case ('error') {
        <pre>Error: {{ stockResource.error() | json }}</pre>
      }
      @case ('loading') {
        <p>Loading...</p>
      }
    }
  `,
})
export default class StocksComponent {
  public st = input<string>();
  protected searchTerm = linkedSignal<string>(() => this.st() ?? 'MSFT');
  private url = 'http://localhost:3000/stocks/';
  protected stockResource = httpResource(() => this.url + this.searchTerm());
}
