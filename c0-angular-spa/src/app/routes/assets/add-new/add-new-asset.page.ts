import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CreateTransactionDto } from "../../../shared/models/create-transaction.dto";
import { PortfolioStore } from "../../../shared/portfolio.store";
import { AddNewAssetFormComponent } from "./add-new-asset.form";

@Component({
  selector: "app-add-new-asset",
  template: ` <app-add-new-asset-form (save)="onSave($event)" /> `,
  imports: [AddNewAssetFormComponent],
})
export default class AddNewAssetPage {
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly router = inject(Router);
  protected onSave(transaction: CreateTransactionDto): void {
    this.portfolioStore.addAsset(transaction);
    this.router.navigate(["/"]);
  }
}
