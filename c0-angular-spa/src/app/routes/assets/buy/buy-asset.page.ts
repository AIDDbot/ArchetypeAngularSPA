import { Component, effect, inject } from "@angular/core";
import { BuyAssetService } from "../../../shared/portfolio/buy-asset.service";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { LoadPortfolioService } from "../../../shared/portfolio/load-portfolio.service";
import { PortfolioStore } from "../../../shared/portfolio/portfolio.store";
import { ResourceComponent } from "../../../shared/resource.component";
import { BuyAssetFormComponent } from "./buy-asset.form";

@Component({
  providers: [BuyAssetService, LoadPortfolioService],
  imports: [BuyAssetFormComponent, ResourceComponent],
  template: `
    <app-buy-asset-form (buy)="onBuy($event)" />
    <app-resource [resource]="buyAssetResource"> </app-resource>
  `,
})
export default class BuyAssetPage {
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly buyAssetService = inject(BuyAssetService);
  private readonly loadPortfolioService = inject(LoadPortfolioService);
  protected readonly buyAssetResource = this.buyAssetService;

  private onBuyAssetResourceStatus = effect(() => {
    if (this.buyAssetResource.status() === "resolved") {
      this.buyAssetResource.status.set("idle");
      this.loadPortfolioService.loadPortfolio();
    }
  });

  protected onBuy(transaction: CreateTransactionDto): void {
    const portfolioId = this.portfolioStore.portfolio().id;
    this.buyAssetService.buyAsset(portfolioId, transaction);
  }
}
