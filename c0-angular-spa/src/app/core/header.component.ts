import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  imports: [],
  template: `
    <header>
      <nav>
        <ul>
          <li><strong>Acme Corp</strong></li>
        </ul>
        <ul>
          <li><a href="#">User</a></li>
          <li><a href="#">Theme</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {}
