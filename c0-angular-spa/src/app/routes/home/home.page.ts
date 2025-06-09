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
  private readonly createPortfolioResource = inject(CreatePortfolioResource);
  private readonly loadPortfolioResource = inject(LoadPortfolioResource);
  protected getPortfolioResource = this.loadPortfolioResource;
  protected portfolio = this.portfolioStore.portfolio;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected netValue = this.portfolioStore.netValue;
  protected lastUpdated = computed(() => this.portfolio()?.lastUpdated);

  protected createPortfolio(portfolio: Portfolio): void {
    this.createPortfolioResource.createPortfolio(portfolio);
  }

  private onCreatePortfolioResourceStatus = effect(() => {
    if (this.createPortfolioResource.status() === "resolved") {
      this.createPortfolioResource.status.set("idle");
      this.loadPortfolioResource.loadPortfolio();
    }
  });
}
