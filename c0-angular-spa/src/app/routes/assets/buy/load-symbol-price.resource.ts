import { httpResource } from "@angular/common/http";
import {
  computed,
  Injectable,
  Resource,
  signal,
  WritableSignal,
} from "@angular/core";
import { AssetType } from "../../../shared/portfolio/asset.type";
import { CryptoRate } from "../../../shared/portfolio/crypto-rate.type";
import { StockPrice } from "../../../shared/portfolio/stock-price.type";

export type SymbolPrice = {
  symbol: string;
  pricePerUnit: number;
};

@Injectable()
export class LoadSymbolPriceResource implements Resource<SymbolPrice> {
  public symbol: WritableSignal<string> = signal<string>("");
  public assetType: WritableSignal<AssetType> = signal<AssetType>("stock");

  private readonly apiUrl = "http://localhost:3000";
  private assetUrl = computed(() =>
    this.assetType() === "stock" ? "stocks" : "cryptos"
  );
  private endpoint = computed(() =>
    this.assetType() === "stock" ? "price" : "rate"
  );
  private readonly getResource = httpResource<StockPrice | CryptoRate>(() =>
    !this.symbol() || !this.assetUrl() || !this.endpoint()
      ? undefined
      : `${this.apiUrl}/${this.assetUrl()}/${this.symbol()}/${this.endpoint()}`
  );

  public value = computed(() => {
    if (this.assetType() === "stock") {
      const stockPrice = this.getResource.value() as StockPrice;
      return {
        symbol: stockPrice.symbol,
        pricePerUnit: stockPrice.price,
      };
    } else {
      const cryptoRate = this.getResource.value() as CryptoRate;
      return {
        symbol: cryptoRate.symbol,
        pricePerUnit: cryptoRate.dollar,
      };
    }
  });
  public status = this.getResource.status;
  public error = this.getResource.error;
  public isLoading = this.getResource.isLoading;
  public hasValue = (): this is Resource<SymbolPrice> => true;
}
