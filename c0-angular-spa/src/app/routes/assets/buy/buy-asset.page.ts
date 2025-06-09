import { Component, effect, inject } from "@angular/core";
import { BuyAssetResource } from "../../../shared/portfolio/buy-asset.resource";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { LoadPortfolioResource } from "../../../shared/portfolio/load-portfolio.resource";
import { PortfolioStore } from "../../../shared/portfolio/portfolio.store";
import { ResourceComponent } from "../../../shared/resource.component";
import { BuyAssetFormComponent } from "./buy-asset.form";

@Component({
  providers: [BuyAssetResource, LoadPortfolioResource],
  imports: [BuyAssetFormComponent, ResourceComponent],
  template: `
    <app-buy-asset-form (buy)="onBuy($event)" />
    <app-resource [resource]="buyAssetResource"> </app-resource>
  `,
})
export default class BuyAssetPage {
  private readonly portfolioStore = inject(PortfolioStore);
  protected readonly buyAssetResource = inject(BuyAssetResource);
  private readonly loadPortfolioResource = inject(LoadPortfolioResource);

  private onBuyAssetResourceStatus = effect(() => {
    if (this.buyAssetResource.status() === "resolved") {
      this.buyAssetResource.status.set("idle");
      this.loadPortfolioResource.loadPortfolio();
    }
  });

  protected onBuy(transaction: CreateTransactionDto): void {
    const portfolioId = this.portfolioStore.portfolio().id;
    this.buyAssetResource.buyAsset(portfolioId, transaction);
  }
}
