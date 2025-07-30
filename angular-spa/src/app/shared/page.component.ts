import { Component, input, InputSignal } from "@angular/core";

@Component({
  selector: "app-page",
  template: `
    <article>
      <header>
        <h1 class="color">
          {{ title() }}
        </h1>
      </header>
      <main>
        <ng-content />
      </main>
      <footer>
        <ng-content select="footer" />
      </footer>
    </article>
  `,
})
export class PageComponent {
  public title: InputSignal<string> = input.required<string>();
}
