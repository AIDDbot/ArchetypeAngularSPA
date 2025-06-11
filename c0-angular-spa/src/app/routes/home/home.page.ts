import { Component, computed, effect, inject } from "@angular/core";
import { PageComponent } from "../../shared/page.component";
import { CreatePortfolioResource } from "../../shared/portfolio/create-portfolio.resource";
import { LoadPortfolioResource } from "../../shared/portfolio/load-portfolio.resource";
import { PortfolioStore } from "../../shared/portfolio/portfolio.store";
import { Portfolio } from "../../shared/portfolio/portfolio.type";
import { ResourceComponent } from "../../shared/resource.component";
import { CreatePortfolioFormComponent } from "./create-portfolio.form";
import { PortfolioComponent } from "./portfolio.component";

@Component({
  providers: [LoadPortfolioResource, CreatePortfolioResource],
  imports: [PageComponent, ResourceComponent, PortfolioComponent, CreatePortfolioFormComponent],
  template: `
    <app-page title="Your Portfolio">
      <app-resource [resource]="loadPortfolio">
        @if (portfolio().id) {
          <app-portfolio
            [portfolio]="portfolio()"
            [netValue]="netValue()"
            [assetsValue]="assetsValue()"
          />
        } @else {
          <app-create-portfolio-form (save)="onCreatePortfolio($event)" />
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
  private readonly createPortfolio = inject(CreatePortfolioResource);
  protected readonly loadPortfolio = inject(LoadPortfolioResource);

  protected portfolio = this.portfolioStore.portfolio;
  protected netValue = this.portfolioStore.netValue;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected lastUpdated = computed(() => this.portfolio()?.lastUpdated);

  protected onCreatePortfolio(portfolio: Portfolio): void {
    this.createPortfolio.createPortfolio(portfolio);
  }

  private onCreatePortfolioResolved = effect(() => {
    if (this.createPortfolio.status() === "resolved") {
      this.createPortfolio.status.set("idle");
      this.loadPortfolio.loadPortfolio();
    }
  });
}
