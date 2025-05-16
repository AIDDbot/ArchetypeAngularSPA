import { Component, inject } from "@angular/core";
import { ENV } from "../shared/env/env.token";
import { Env } from "../shared/env/env.type";

@Component({
  selector: "app-footer",
  imports: [],
  template: `
    <footer>
      <small>
        &copy; {{ year }} by {{ env.author }}. All rights reserved.
      </small>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  protected env: Env = inject(ENV);
  protected year: number = new Date().getFullYear();
}
