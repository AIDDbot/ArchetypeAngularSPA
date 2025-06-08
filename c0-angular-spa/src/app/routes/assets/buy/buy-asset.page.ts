import { Component, computed, effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorComponent } from "../../../shared/error.component";
import { CreateTransactionDto } from "../../../shared/models/create-transaction.dto";
import { PortfolioStore } from "../../../shared/portfolio.store";
import { BuyAssetFormComponent } from "./buy-asset.form";
import { BuyAssetService } from "./buy-asset.service";

@Component({
  selector: "app-add-new-asset",
  imports: [BuyAssetFormComponent, ErrorComponent],
  template: `
    <app-buy-asset-form (buy)="onBuy($event)" />
    @if (errorMessage() !== "") {
      <app-error [message]="errorMessage()" />
    }
  `,
})
export default class BuyAssetPage {
  private readonly buyAssetService = inject(BuyAssetService);
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly router = inject(Router);
  protected readonly buyAssetResource = this.buyAssetService;
  protected errorMessage = computed(() => {
    const error = this.buyAssetService.error();
    if (error) {
      return error.message;
    }
    return "";
  });
  private onBuyAssetResourceStatus = effect(() => {
    if (this.buyAssetResource.status() === "resolved") {
      this.buyAssetResource.status.set("idle");
      // alternatively reload portfolio, and keep the same route
      this.router.navigate(["/"]);
    }
  });

  protected onBuy(transaction: CreateTransactionDto): void {
    this.buyAssetService.buyAsset(transaction);
  }
}
