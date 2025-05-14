import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LogService } from '../../shared/log.service';
import { PageComponent } from '../../shared/page.component';
import { HomeStoreService } from './home.store.service';

@Component({
  selector: 'app-home',
  imports: [PageComponent, JsonPipe],
  template: `
    <app-page title="Home">
      <p>
        Welcome to the home page
      </p>
      <pre>
        {{ ipinfo() | json }}
      </pre>
    </app-page>
  `,
  styles: ``
})
export default class HomePage {
  private log = inject(LogService);
  private homeStore = inject(HomeStoreService);
  protected ipinfo = this.homeStore.ipinfo.value;
  constructor() {
    this.log.info("HomePage constructor");
  }
}
