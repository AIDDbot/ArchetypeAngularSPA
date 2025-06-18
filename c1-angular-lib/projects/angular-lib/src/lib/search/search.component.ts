import { Component, effect, ElementRef, inject, model, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'lib-search',
  template: ` <input type="search" [value]="searchTerm()" #searchInput /> `,
})
export class SearchComponent {
  private router = inject(Router);
  protected searchInputElRef = viewChild<ElementRef>('searchInput');

  public searchTerm = model<string>('');

  private onSearchInputElRef = effect(() => {
    const searchInputNg = this.searchInputElRef();
    if (!searchInputNg) return;
    const searchInputNative = searchInputNg.nativeElement;
    fromEvent<InputEvent>(searchInputNative, 'input')
      .pipe(
        map((event) => event.target as HTMLInputElement),
        map((target) => target.value),
        filter((value) => value.length == 0 || value.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        tap((value) => this.searchTerm.set(value)),
      )
      .subscribe();
  });

  private onSearchTerm = effect(() => {
    const st = this.searchTerm();
    this.router.navigate([], { queryParams: { st } });
  });
}
