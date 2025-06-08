import { Component, computed, effect, inject } from "@angular/core";
import { Portfolio } from "../../shared/models/portfolio.type";
import { PageComponent } from "../../shared/page.component";
import { PortfolioStore } from "../../shared/portfolio.store";
import { ResourceComponent } from "../../shared/resource.component";
import { CreatePortfolioFormComponent } from "./create-portfolio.form";
import { CreatePortfolioService } from "./create-portfolio.service";
import { LoadPortfolioService } from "./load-portfolio.service";
import { PortfolioComponent } from "./portfolio.component";

@Component({
  providers: [LoadPortfolioService, CreatePortfolioService],
  imports: [
    PageComponent,
    ResourceComponent,
    PortfolioComponent,
    CreatePortfolioFormComponent,
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
          <app-create-portfolio-form (save)="createPortfolio($event)" />
        }
      </app-resource>
      <footer>
        <p>Last updated: {{ lastUpdated() }}</p>
      </footer>
    </app-page>
  `,
})
export default class HomePage {
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly createPortfolioService = inject(CreatePortfolioService);
  private readonly loadPortfolioService = inject(LoadPortfolioService);
  protected getPortfolioResource = this.loadPortfolioService;
  protected portfolio = this.portfolioStore.portfolio;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected netValue = this.portfolioStore.netValue;
  protected lastUpdated = computed(() => this.portfolio()?.lastUpdated);

  protected createPortfolio(portfolio: Portfolio): void {
    this.createPortfolioService.createPortfolio(portfolio);
  }
  constructor() {
    this.loadPortfolioService.loadPortfolio();
  }

  private onCreatePortfolioResourceStatus = effect(() => {
    if (this.createPortfolioService.status() === "resolved") {
      this.createPortfolioService.status.set("idle");
      this.loadPortfolioService.loadPortfolio();
    }
  });

  private onLoadPortfolioResourceStatus = effect(() => {
    if (this.loadPortfolioService.status() === "resolved") {
      this.portfolioStore.setState(this.loadPortfolioService.value());
    }
  });
}
