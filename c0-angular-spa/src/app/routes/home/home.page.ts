import { JsonPipe } from "@angular/common";
import { Component, inject, Signal, signal } from "@angular/core";
import { ENV } from "../../shared/env/env.token";
import type { Env } from "../../shared/env/env.type";
import { ErrorComponent } from "../../shared/error.component";
import { PageComponent } from "../../shared/page.component";
import { WaitingComponent } from "../../shared/waiting.component";
import { HomeStoreService } from "./home.store.service";

@Component({
  imports: [PageComponent, JsonPipe, WaitingComponent, ErrorComponent],
  template: `
    <app-page [title]="title()">
      <h1>Portfolio</h1>
      @if (portfolioStatus() === "loading") {
        <app-waiting />
      }
      @if (portfolioStatus() === "error") {
        <app-error />
      }
      @defer (when portfolioStatus() === "resolved") {
        <pre>{{ portfolio() | json }}</pre>
      }
    </app-page>
  `,
})
export default class HomePage {
  private readonly homeStore = inject(HomeStoreService);
  private readonly env: Env = inject(ENV);
  protected title: Signal<string> = signal(this.env.name);
  protected portfolio = this.homeStore.portfolio;
  protected portfolioStatus = this.homeStore.portfolioStatus;
}
