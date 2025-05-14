import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { APP } from "./app-token";
import { ThemeToggleComponent } from "./theme-toggle.component";

@Component({
  selector: "app-header",
  imports: [ThemeToggleComponent, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <li ><a routerLink="/"><strong>{{ app.name }}</strong></a></li>
        </ul>
        <ul>
          <li><a href="#">User</a></li>
          <li>
            <app-theme-toggle />
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  protected app = inject(APP);
}
