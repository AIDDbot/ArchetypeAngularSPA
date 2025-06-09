import { Component, computed, effect, inject } from "@angular/core";
import { PageComponent } from "../../shared/page.component";
import { CreatePortfolioService } from "../../shared/portfolio/create-portfolio.service";
import { LoadPortfolioService } from "../../shared/portfolio/load-portfolio.service";
import { PortfolioStore } from "../../shared/portfolio/portfolio.store";
import { Portfolio } from "../../shared/portfolio/portfolio.type";
import { ResourceComponent } from "../../shared/resource.component";
import { CreatePortfolioFormComponent } from "./create-portfolio.form";
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

  private onCreatePortfolioResourceStatus = effect(() => {
    if (this.createPortfolioService.status() === "resolved") {
      this.createPortfolioService.status.set("idle");
      this.loadPortfolioService.loadPortfolio();
    }
  });
}
