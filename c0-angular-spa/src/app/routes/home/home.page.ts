import {
  Component,
  inject,
  ResourceStatus,
  Signal,
  signal,
} from "@angular/core";
import { ErrorComponent } from "../../shared/error.component";
import { PageComponent } from "../../shared/page.component";
import { WaitingComponent } from "../../shared/waiting.component";
import { HomeComponent } from "./home.component";
import { HomeStoreService } from "./home.store.service";
import { IpApi } from "./ip-api.type";

@Component({
  imports: [PageComponent, HomeComponent, WaitingComponent, ErrorComponent],
  template: `
    <app-page [title]="title()">
      @if (ipApiStatus() === "loading") {
        <app-waiting />
      }
      @if (ipApiStatus() === "error") {
        <app-error />
      }
      @defer (when ipApiStatus()==='resolved') {
        <app-home [ipApi]="ipApi()" />
      }
    </app-page>
  `,
})
export default class HomePage {
  private readonly homeStore = inject(HomeStoreService);

  protected title: Signal<string> = signal("Home Page Title");
  protected ipApi: Signal<IpApi | undefined> = this.homeStore.ipApi;
  protected ipApiStatus: Signal<ResourceStatus> = this.homeStore.ipApiStatus;
}
