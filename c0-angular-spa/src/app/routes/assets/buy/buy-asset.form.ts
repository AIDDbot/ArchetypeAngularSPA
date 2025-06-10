import {
  Component,
  effect,
  inject,
  model,
  output,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AssetType } from "../../../shared/portfolio/asset.type";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { LoadStockPriceResource } from "./load-stock-price.resource";
import { LoadStocksResource } from "./load-stocks.resource";

@Component({
  selector: "app-buy-asset-form",
  imports: [ReactiveFormsModule],
  providers: [LoadStocksResource, LoadStockPriceResource],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <legend>Buy an Asset</legend>
        <label for="asset_type">Asset Type</label>
        <section>
          <input type="radio" id="stock" name="asset_type" />
          <label for="stock"> Stock </label>
          <input type="radio" id="crypto" name="asset_type" />
          <label for="crypto"> Crypto </label>
        </section>
        <label for="symbol">Symbol</label>
        <select
          formControlName="symbol"
          id="symbol"
          (change)="onSymbolChange($event)"
        >
          @for (symbol of symbols(); track symbol.symbol) {
            <option [value]="symbol.symbol">
              {{ symbol.name }}
            </option>
          }
        </select>
        <label for="price_per_unit">Price per unit</label>
        <input
          type="number"
          formControlName="price_per_unit"
          id="price_per_unit"
          readonly
        />
        <label for="units">Units</label>
        <input type="number" formControlName="units" id="units" />
      </fieldset>
      <button type="submit" (click)="onSubmitClick()">Buy</button>
    </form>
  `,
})
export class BuyAssetFormComponent {
  private readonly loadStocksResource = inject(LoadStocksResource);
  private readonly loadStockPriceResource = inject(LoadStockPriceResource);
  protected readonly form = new FormGroup({
    symbol: new FormControl("AAPL", [Validators.required]),
    price_per_unit: new FormControl(150, [Validators.required]),
    units: new FormControl(100, [Validators.required]),
  });
  public buy = output<CreateTransactionDto>();
  protected onSubmitClick(): void {
    const transaction: CreateTransactionDto = {
      ...(this.form.value as unknown as CreateTransactionDto),
      type: "buy",
      asset_type: "stock",
    };
    this.buy.emit(transaction);
  }
  protected symbolTypeRadio = model<AssetType>("stock");
  protected symbols = model<{ symbol: string; name: string }[]>([]);
  private readonly onSymbolChangeEffect = effect(() => {
    if (this.symbolTypeRadio() === "stock") {
      this.symbols.set(
        this.loadStocksResource.value().map((stock) => ({
          symbol: stock.symbol,
          name: stock.name,
        }))
      );
    }
  });
  protected selectedSymbol: WritableSignal<string> = signal<string>("");
  protected onSymbolChange(event: Event): void {
    const symbol = (event.target as HTMLSelectElement).value;
    this.selectedSymbol.set(symbol);
  }
  private readonly onSelectedSymbolChange = effect(() => {
    this.loadStockPriceResource.symbol.set(this.selectedSymbol());
  });
  private readonly onLoadStockPriceResourceStatus = effect(() => {
    if (this.loadStockPriceResource.status() === "resolved") {
      this.form.patchValue({
        price_per_unit: this.loadStockPriceResource.value().price,
      });
    }
  });
}
