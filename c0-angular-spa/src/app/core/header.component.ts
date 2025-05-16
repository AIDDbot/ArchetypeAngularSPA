import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ENV } from "../shared/env/env.token";
import { Env } from "../shared/env/env.type";
import { ThemeToggleComponent } from "./theme-toggle.component";

@Component({
  selector: "app-header",
  imports: [ThemeToggleComponent, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a routerLink="/"
              ><strong>{{ env.name }}</strong></a
            >
          </li>
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
  protected env: Env = inject(ENV);
}
