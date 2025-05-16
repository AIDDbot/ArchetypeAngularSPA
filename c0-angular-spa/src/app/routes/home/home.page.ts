import { JsonPipe } from "@angular/common";
import { Component, inject, WritableSignal } from "@angular/core";
import { LogService } from "../../shared/log/log.service";
import { PageComponent } from "../../shared/page.component";
import { HomeStoreService } from "./home.store.service";
import { IpApi } from "./ip-api.type";

@Component({
  selector: "app-home",
  imports: [PageComponent, JsonPipe],
  template: `
    <app-page [title]="title">
      <p>Welcome to the home page</p>
      <pre>
        {{ ipApi() | json }}
      </pre
      >
    </app-page>
  `,
  styles: ``,
})
export default class HomePage {
  private log: LogService = inject(LogService);
  private homeStore: HomeStoreService = inject(HomeStoreService);
  protected ipApi: WritableSignal<IpApi | undefined> =
    this.homeStore.ipApiResource.value;
  protected title = "Home page";

  constructor() {
    this.log.info("HomePage visited");
  }
}
