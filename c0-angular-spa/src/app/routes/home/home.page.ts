import { Component, inject, Signal, signal } from "@angular/core";
import { ENV } from "../../shared/env/env.token";
import type { Env } from "../../shared/env/env.type";
import { PageComponent } from "../../shared/page.component";
import { HomeStoreService } from "./home.store.service";

@Component({
  imports: [PageComponent],
  template: ` <app-page [title]="title()"> </app-page> `,
})
export default class HomePage {
  private readonly homeStore = inject(HomeStoreService);
  private readonly env: Env = inject(ENV);
  protected title: Signal<string> = signal(this.env.name);
}
