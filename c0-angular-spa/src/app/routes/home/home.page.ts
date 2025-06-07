import { Component, computed, inject } from "@angular/core";
import { Portfolio } from "../../shared/models/portfolio.type";
import { PageComponent } from "../../shared/page.component";
import { PortfolioStore } from "../../shared/portfolio.store";
import { ResourceComponent } from "../../shared/resource.component";
import { PortfolioComponent } from "./portfolio.component";
import { PortfolioFormComponent } from "./portfolio.form";

@Component({
  imports: [
    PageComponent,
    ResourceComponent,
    PortfolioComponent,
    PortfolioFormComponent,
  ],
  template: `
    <app-page title="Your Portfolio">
      <app-resource [resource]="getPortfolioResource">
        @if (portfolio().id) {
          <app-portfolio
            [portfolio]="portfolio()"
            [netValue]="netValue()"
            [assetsValue]="assetsValue()"
          />
        } @else {
          <app-portfolio-form (save)="createPortfolio($event)" />
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
  protected getPortfolioResource = this.portfolioStore.getResource;
  protected portfolio = this.portfolioStore.portfolio;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected netValue = this.portfolioStore.netValue;
  protected lastUpdated = computed(() => this.portfolio()?.lastUpdated);

  protected createPortfolio(portfolio: Portfolio): void {
    this.portfolioStore.updatePortfolio(portfolio);
  }
}
