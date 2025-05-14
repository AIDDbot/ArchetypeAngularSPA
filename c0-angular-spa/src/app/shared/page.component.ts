import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page',
  imports: [],
  template: `
    <article>
      <header>
        <h1>
          {{ title() }}
        </h1>
      </header>
      <main>
        <ng-content />
      </main>
    </article>
  `,
  styles: ``
})
export class PageComponent {
  public title = input.required<string>();
}
