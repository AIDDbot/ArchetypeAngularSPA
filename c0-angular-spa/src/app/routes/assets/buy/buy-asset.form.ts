import { Component, effect, inject, model, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AssetType } from "../../../shared/portfolio/asset.type";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { LoadSymbolPriceResource } from "./load-symbol-price.resource";
import { LoadSymbolsResource } from "./load-symbols.resource";

@Component({
  selector: "app-buy-asset-form",
  imports: [FormsModule],
  providers: [LoadSymbolsResource, LoadSymbolPriceResource],
  template: `
    <form>
      <fieldset>
        <legend>Buy an Asset</legend>
        <label for="asset_type">Asset Type to buy</label>
        <section>
          <input
            type="radio"
            name="asset_type"
            id="stock"
            value="stock"
            [(ngModel)]="assetType"
          />
          <label for="stock"> Stock </label>
          <input
            type="radio"
            name="asset_type"
            id="crypto"
            value="crypto"
            [(ngModel)]="assetType"
          />
          <label for="crypto"> Crypto </label>
        </section>
        <label for="symbol">Symbol to buy</label>
        <select [(ngModel)]="symbol" id="symbol" name="symbol">
          @for (symbol of symbols(); track symbol.symbol) {
            <option [value]="symbol.symbol">
              {{ symbol.name }}
            </option>
          }
        </select>
        <label for="price_per_unit">Price per unit</label>
        <input
          type="number"
          [(ngModel)]="pricePerUnit"
          name="price_per_unit"
          id="price_per_unit"
          readonly
        />
        <label for="units">Units</label>
        <input
          type="number"
          [(ngModel)]="units"
          name="units"
          id="units"
          min="1"
        />
      </fieldset>
      <button type="submit" (click)="onSubmitClick()">Buy</button>
    </form>
  `,
})
export class BuyAssetFormComponent {
  public buy = output<CreateTransactionDto>();
  private readonly loadSymbolsResource = inject(LoadSymbolsResource);
  private readonly loadSymbolPriceResource = inject(LoadSymbolPriceResource);

  protected assetType = model<AssetType>("stock");
  protected symbols = model<{ symbol: string; name: string }[]>([]);
  protected symbol = model<string>("");
  protected pricePerUnit = model<number>(0);
  protected units = model<number>(100);

  private readonly onSymbolTypeRadioChange = effect(() => {
    this.loadSymbolsResource.assetType.set(this.assetType());
    this.loadSymbolPriceResource.assetType.set(this.assetType());
  });
  private readonly onSelectedSymbolChange = effect(() => {
    this.loadSymbolPriceResource.symbol.set(this.symbol());
  });
  private readonly onLoadSymbolsResourceStatus = effect(() => {
    if (this.loadSymbolsResource.status() === "resolved") {
      this.symbols.set(this.loadSymbolsResource.value());
    }
  });
  private readonly onLoadSymbolPriceResourceStatus = effect(() => {
    if (this.loadSymbolPriceResource.status() === "resolved") {
      this.pricePerUnit.set(this.loadSymbolPriceResource.value().pricePerUnit);
    }
  });

  protected onSubmitClick(): void {
    const transaction: CreateTransactionDto = {
      symbol: this.symbol(),
      price_per_unit: this.loadSymbolPriceResource.value().pricePerUnit,
      units: this.units(),
      type: "buy",
      asset_type: "stock",
    };
    this.buy.emit(transaction);
  }
}
