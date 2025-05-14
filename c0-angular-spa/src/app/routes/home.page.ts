import { Component, inject } from '@angular/core';
import { LogService } from '../shared/log.service';
import { PageComponent } from '../shared/page.component';

@Component({
  selector: 'app-home',
  imports: [PageComponent],
  template: `
    <app-page title="Home">
      <p>
        Welcome to the home page
      </p>
    </app-page>
  `,
  styles: ``
})
export default class HomePage {
  private log = inject(LogService);
  constructor() {
    this.log.info("HomePage constructor");
  }
}
