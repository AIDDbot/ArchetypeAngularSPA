import { Component, effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorComponent } from "../../../shared/error.component";
import { CreateTransactionDto } from "../../../shared/models/create-transaction.dto";
import { PortfolioStore } from "../../../shared/portfolio.store";
import { AddNewAssetFormComponent } from "./add-new-asset.form";

@Component({
  selector: "app-add-new-asset",
  imports: [AddNewAssetFormComponent, ErrorComponent],
  template: `
    <app-add-new-asset-form (save)="onSave($event)" />
    @if (this.addAssetResource.error()) {
      <app-error [message]="errorMessage()" />
    }
  `,
})
export default class AddNewAssetPage {
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly router = inject(Router);
  protected onSave(transaction: CreateTransactionDto): void {
    this.portfolioStore.addAsset(transaction);
  }
  protected readonly addAssetResource = this.portfolioStore.addAssetResource;
  private onAddAssetResourceStatus = effect(() => {
    if (this.addAssetResource.status() === "resolved") {
      this.addAssetResource.status.set("idle");
      this.router.navigate(["/"]);
    }
  });
  protected errorMessage = this.portfolioStore.addAssetErrorMessage;
}
