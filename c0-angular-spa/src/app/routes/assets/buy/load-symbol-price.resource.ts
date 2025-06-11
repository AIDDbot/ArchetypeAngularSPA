import { httpResource } from "@angular/common/http";
import { computed, Injectable, Resource, signal } from "@angular/core";
import { AssetType } from "../../../shared/portfolio/asset.type";
import { CryptoRate } from "../../../shared/portfolio/crypto-rate.type";
import { StockPrice } from "../../../shared/portfolio/stock-price.type";

// Example responses:

// http://localhost:3000/stocks/AAPL/price
// {"symbol":"AAPL","price":303,"date":1749637206364}
// http://localhost:3000/cryptos/BTC/rate
// {"symbol":"BTC","dollar":4944.18,"date":1749637255729}

@Injectable()
export class LoadSymbolPriceResource implements Resource<number> {
  private readonly apiUrl = "http://localhost:3000";
  private readonly symbolPrice = httpResource<StockPrice | CryptoRate>(() => {
    const invalidParams = !this.symbol() || !this.assetUrl() || !this.endpoint();
    if (invalidParams) {
      return undefined;
    }
    return `${this.apiUrl}/${this.assetUrl()}/${this.symbol()}/${this.endpoint()}`;
  });

  public assetType = signal<AssetType>("stock");
  public symbol = signal<string>("");

  private assetUrl = computed(() => (this.assetType() === "stock" ? "stocks" : "cryptos"));
  private endpoint = computed(() => (this.assetType() === "stock" ? "price" : "rate"));

  public value = computed(() => {
    if (this.assetType() === "stock") {
      const stockPrice = this.symbolPrice.value() as StockPrice;
      return stockPrice?.price ?? 0;
    } else {
      const cryptoRate = this.symbolPrice.value() as CryptoRate;
      return cryptoRate?.dollar ?? 0;
    }
  });
  public status = this.symbolPrice.status;
  public error = this.symbolPrice.error;
  public isLoading = this.symbolPrice.isLoading;
  public hasValue = (): this is Resource<number> => true;
}
