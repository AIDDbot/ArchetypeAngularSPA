import { Component, effect, inject } from "@angular/core";
import { PageComponent } from "../../../shared/page.component";
import { BuyAssetResource } from "../../../shared/portfolio/buy-asset.resource";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { LoadPortfolioResource } from "../../../shared/portfolio/load-portfolio.resource";
import { PortfolioStore } from "../../../shared/portfolio/portfolio.store";
import { ResourceComponent } from "../../../shared/resource.component";
import { BuyAssetFormComponent } from "./buy-asset.form";

@Component({
  providers: [BuyAssetResource, LoadPortfolioResource],
  imports: [BuyAssetFormComponent, ResourceComponent, PageComponent],
  template: `
    <app-page title="Buy an Asset">
      <app-buy-asset-form (buy)="onBuy($event)" />
      <app-resource [resource]="buyAsset"> </app-resource>
    </app-page>
  `,
})
export default class BuyAssetPage {
  private readonly portfolioStore = inject(PortfolioStore);
  protected readonly buyAsset = inject(BuyAssetResource);
  private readonly loadPortfolio = inject(LoadPortfolioResource);

  private onBuyAssetResolved = effect(() => {
    if (this.buyAsset.status() === "resolved") {
      this.buyAsset.status.set("idle");
      this.loadPortfolio.loadPortfolio();
    }
  });

  private onLoadPortfolioResolved = effect(() => {
    if (this.loadPortfolio.status() === "resolved") {
      this.portfolioStore.setState(this.loadPortfolio.value());
    }
  });

  protected onBuy(transaction: CreateTransactionDto): void {
    const portfolioId = this.portfolioStore.portfolio().id;
    this.buyAsset.buyAsset(portfolioId, transaction);
  }
}
