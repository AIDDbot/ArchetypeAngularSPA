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
export class LoadSymbolPriceResource
  implements
    Resource<{
      symbol: string;
      pricePerUnit: number;
    }>
{
  public symbol: WritableSignal<string> = signal<string>("");
  public assetType: WritableSignal<AssetType> = signal<AssetType>("stock");

  private readonly apiUrl = "http://localhost:3000/";
  private readonly getResource = httpResource<StockPrice | CryptoRate>(
    () =>
      `${this.apiUrl}${this.assetResource()}/${this.symbol()}/${this.assetEndpoint()}`
  );
  private assetResource = computed(() =>
    this.assetType() === "stock" ? "stocks" : "cryptos"
  );
  private assetEndpoint = computed(() =>
    this.assetType() === "stock" ? "price" : "rate"
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
  public hasValue = (): this is Resource<{
    symbol: string;
    pricePerUnit: number;
  }> => true;
}
