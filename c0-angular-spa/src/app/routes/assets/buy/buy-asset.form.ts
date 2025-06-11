import { Component, computed, inject, linkedSignal, model, output } from "@angular/core";
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
      <fieldset class="grid">
        <section>
          <section>
            <label for="asset_type">Asset Type to buy</label>
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
            <label htmlFor="crypto"> Crypto </label>
          </section>
          <label for="symbol">Symbol to buy</label>
          <select [(ngModel)]="symbol" id="symbol" name="symbol">
            @for (anySymbol of symbols(); track anySymbol.symbol) {
              <option [value]="anySymbol.symbol">
                {{ anySymbol.name }}
              </option>
            }
          </select>
        </section>
        <section>
          <label for="price_per_unit">Price per unit</label>
          <input
            type="number"
            [value]="pricePerUnit()"
            name="price_per_unit"
            id="price_per_unit"
            readonly
          />
          <label for="units">Units</label>
          <input type="number" [(ngModel)]="units" name="units" id="units" min="1" />
        </section>
      </fieldset>
      <button type="submit" (click)="onSubmitClick()">Buy</button>
    </form>
  `,
})
export class BuyAssetFormComponent {
  public readonly buy = output<CreateTransactionDto>();

  private readonly symbolsResource = inject(LoadSymbolsResource);
  private readonly symbolPriceResource = inject(LoadSymbolPriceResource);

  protected assetType = model<AssetType>("stock");
  protected symbols = this.symbolsResource.value;
  protected firstSymbol = computed(() => this.symbols()[0]?.symbol);
  protected symbol = linkedSignal<string>(() => this.firstSymbol() ?? "");
  protected pricePerUnit = this.symbolPriceResource.value;
  protected units = model<number>(1);

  constructor() {
    this.symbolsResource.assetType = this.assetType;
    this.symbolPriceResource.assetType = this.assetType;
    this.symbolPriceResource.symbol = this.symbol;
  }

  protected onSubmitClick(): void {
    const transaction: CreateTransactionDto = {
      type: "buy",
      asset_type: this.assetType(),
      symbol: this.symbol(),
      price_per_unit: this.symbolPriceResource.value(),
      units: this.units(),
    };
    this.buy.emit(transaction);
    this.units.set(1);
    this.symbol.set(this.firstSymbol());
  }
}
