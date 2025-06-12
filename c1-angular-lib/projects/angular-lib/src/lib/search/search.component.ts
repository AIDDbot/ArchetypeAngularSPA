import { Component, effect, ElementRef, inject, model, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'lib-search',
  template: ` <input type="search" [value]="searchTerm()" #searchInput /> `,
})
export class SearchComponent {
  private router = inject(Router);
  protected searchInputEl = viewChild<ElementRef>('searchInput');
  public searchTerm = model<string>('');

  private onInputElement = effect(() => {
    const inputEl = this.searchInputEl();
    if (!inputEl) return;
    fromEvent<InputEvent>(inputEl.nativeElement, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        filter((value) => value.length > 2 || value.length === 0),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.searchTerm.set(value);
      });
  });

  private onSearchTermChange = effect(() => {
    const searchTerm = this.searchTerm();
    this.router.navigate([], { queryParams: { search: searchTerm } });
  });
}
