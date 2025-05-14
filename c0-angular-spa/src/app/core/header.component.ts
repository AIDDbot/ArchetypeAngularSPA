import { Component } from "@angular/core";
import { ThemeToggleComponent } from "./theme-toggle.component";

@Component({
  selector: "app-header",
  imports: [ThemeToggleComponent],
  template: `
    <header>
      <nav>
        <ul>
          <li><strong>Acme Corp</strong></li>
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
export class HeaderComponent {}
