import { Component, effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BuyAssetService } from "../../../shared/portfolio/buy-asset.service";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { ResourceComponent } from "../../../shared/resource.component";
import { BuyAssetFormComponent } from "./buy-asset.form";

@Component({
  providers: [BuyAssetService],
  imports: [BuyAssetFormComponent, ResourceComponent],
  template: `
    <app-buy-asset-form (buy)="onBuy($event)" />
    <app-resource [resource]="buyAssetResource"> </app-resource>
  `,
})
export default class BuyAssetPage {
  private readonly buyAssetService = inject(BuyAssetService);
  private readonly router = inject(Router);
  protected readonly buyAssetResource = this.buyAssetService;

  private onBuyAssetResourceStatus = effect(() => {
    if (this.buyAssetResource.status() === "resolved") {
      this.buyAssetResource.status.set("idle");
      // alternatively
      // op1: reload portfolio, and keep the same route
      // op2: change portfolio state based on the new asset bought
      this.router.navigate(["/"]);
    }
  });

  protected onBuy(transaction: CreateTransactionDto): void {
    this.buyAssetService.buyAsset(transaction);
  }
}
