import { JsonPipe } from "@angular/common";
import { httpResource } from "@angular/common/http";
import { Component, computed, inject } from "@angular/core";
import { Portfolio } from "../../shared/models/portfolio.type";
import { PageComponent } from "../../shared/page.component";
import { PortfolioStore } from "../../shared/portfolio.store";
import { ResourceComponent } from "../../shared/resource.component";
import { HomeComponent } from "./home.component";
import { PortfolioFormComponent } from "./portfolio.form";

@Component({
  imports: [
    PageComponent,
    ResourceComponent,
    HomeComponent,
    PortfolioFormComponent,
    JsonPipe,
  ],
  template: `
    <app-page title="Your Portfolio">
      <pre>Value: {{ portfolioResource.value() | json }}</pre>
      <pre>Status: {{ portfolioResource.status() | json }}</pre>
      <pre>Error: {{ portfolioResource.error() | json }}</pre>

      <app-resource [resource]="portfolioResource">
        @if (portfolio().id) {
          <app-home
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
  protected portfolioResource = httpResource<Portfolio[]>(
    () => "http://localhost:3000/portfolios"
  );
  protected portfolio = this.portfolioStore.portfolio;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected netValue = this.portfolioStore.netValue;
  protected lastUpdated = computed(() => this.portfolio()?.lastUpdated);

  protected createPortfolio(portfolio: Portfolio): void {
    this.portfolioStore.updatePortfolio(portfolio);
  }
}
