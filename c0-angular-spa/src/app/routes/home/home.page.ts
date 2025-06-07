import { JsonPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { PageComponent } from "../../shared/page.component";
import { PortfolioStore } from "../../shared/portfolio.store";
import { ResourceComponent } from "../../shared/resource.component";
import { HomeComponent } from "./home.component";

@Component({
  imports: [PageComponent, ResourceComponent, HomeComponent, JsonPipe],
  template: `
    <app-page title="Your Portfolio">
      <app-resource [resource]="portfolioResource">
        @if (portfolio().id) {
          <app-home
            [portfolio]="portfolio()"
            [netValue]="netValue()"
            [assetsValue]="assetsValue()"
          />
        } @else {
          <form>
            <label for="initial_cash">Initial Cash</label>
            <input type="number" name="initial_cash" />
            <label for="name">Name</label>
            <input type="text" name="name" />
            <button type="button" (click)="createPortfolio()">Create</button>
          </form>
        }
      </app-resource>
      <footer>
        <p>Last updated: {{ lastUpdated() }}</p>
      </footer>
    </app-page>
  `,
})
export default class HomePage {
  //private readonly homeStore = inject(HomeStoreService);
  private readonly portfolioStore = inject(PortfolioStore);
  protected portfolioResource = this.portfolioStore.resource;
  protected portfolio = this.portfolioStore.portfolio;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected netValue = this.portfolioStore.netValue;
  protected lastUpdated = computed(() => this.portfolio()?.lastUpdated);

  protected createPortfolio(): void {
    this.portfolioStore.updatePortfolio({
      ...this.portfolio(),
      id: "1",
      name: "Portfolio 1",
      initial_cash: 1000,
      cash: 1000,
    });
  }
}
