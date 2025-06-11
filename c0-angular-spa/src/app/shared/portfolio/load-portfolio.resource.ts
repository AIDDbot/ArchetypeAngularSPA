import { httpResource } from "@angular/common/http";
import { effect, Injectable, Resource, signal } from "@angular/core";
import { Asset, AssetType } from "./asset.type";
import { CryptoRate } from "./crypto-rate.type";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";
import { StockPrice } from "./stock-price.type";

@Injectable()
export class LoadPortfolioResource implements Resource<Portfolio> {
  private readonly url = "http://localhost:3000/portfolios";
  private readonly portfolios = httpResource<Portfolio[]>(() => this.url);

  public value = signal(DEFAULT_PORTFOLIO);
  public status = this.portfolios.status;
  public error = this.portfolios.error;
  public isLoading = this.portfolios.isLoading;
  public hasValue = (): this is Resource<Portfolio> => true;

  private onLoadPortfolioResolved = effect(async () => {
    if (this.portfolios.status() !== "resolved") {
      return;
    }

    const portfolio = this.portfolios.value()?.[0];
    if (!portfolio) {
      return;
    }
    const updatedAssetPrices = await Promise.all(
      portfolio.assets.map((asset) => this.fetchAssetPrice(asset)),
    );
    portfolio.assets = updatedAssetPrices;
    this.value.set(portfolio);
  });

  private async fetchAssetPrice(asset: Asset): Promise<Asset> {
    const url = this.buildUrl(asset);

    const response = await fetch(url);
    const lastPrice = await this.extractLastPrice(response, asset.asset_type);
    return { ...asset, last_price: lastPrice };
  }

  public loadPortfolio(): void {
    this.portfolios.reload();
  }

  private buildUrl(asset: Asset) {
    let url = "http://localhost:3000";
    if (asset.asset_type === "stock") {
      url = url + "/stocks/" + asset.symbol + "/price";
    } else {
      url = url + "/cryptos/" + asset.symbol + "/rate";
    }
    return url;
  }

  private async extractLastPrice(response: Response, assetType: AssetType) {
    const data = await response.json();
    const lastPrice =
      assetType === "stock" ? (data as StockPrice).price : (data as CryptoRate).dollar;
    return lastPrice;
  }
}
