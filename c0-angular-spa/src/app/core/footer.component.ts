import { Component, inject } from "@angular/core";
import { APP } from "../shared/app.token";

@Component({
  selector: "app-footer",
  imports: [],
  template: `
    <footer>
      <small>
        &copy; {{ year }} by {{ app.author }}. All rights reserved.
      </small>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  protected app = inject(APP);
  protected year = new Date().getFullYear();
}
