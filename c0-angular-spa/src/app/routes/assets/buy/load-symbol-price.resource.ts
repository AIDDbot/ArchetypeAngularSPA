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

@Injectable()
export class LoadSymbolPriceResource implements Resource<number> {
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
      return stockPrice?.price ?? 0;
    } else {
      const cryptoRate = this.getResource.value() as CryptoRate;
      return cryptoRate?.dollar ?? 0;
    }
  });
  public status = this.getResource.status;
  public error = this.getResource.error;
  public isLoading = this.getResource.isLoading;
  public hasValue = (): this is Resource<number> => true;
}
