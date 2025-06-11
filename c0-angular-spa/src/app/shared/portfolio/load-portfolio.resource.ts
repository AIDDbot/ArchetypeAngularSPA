import { httpResource } from "@angular/common/http";
import { effect, inject, Injectable, Resource, signal } from "@angular/core";
import { Asset } from "./asset.type";
import { CryptoRate } from "./crypto-rate.type";
import { PortfolioStore } from "./portfolio.store";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";
import { StockPrice } from "./stock-price.type";

@Injectable()
export class LoadPortfolioResource implements Resource<Portfolio> {
  private readonly url = "http://localhost:3000/portfolios";
  private readonly portfolios = httpResource<Portfolio[]>(() => this.url);
  private readonly portfolioStore = inject(PortfolioStore);

  public value = signal(DEFAULT_PORTFOLIO);
  public status = this.portfolios.status;
  public error = this.portfolios.error;
  public isLoading = this.portfolios.isLoading;
  public hasValue = (): this is Resource<Portfolio> => true;

  public loadPortfolio(): void {
    this.portfolios.reload();
  }

  private async fetchAssetPrice(asset: Asset): Promise<Asset> {
    const assetUrl = asset.asset_type === "stock" ? "stocks" : "cryptos";
    const endpoint = asset.asset_type === "stock" ? "price" : "rate";
    const url = `http://localhost:3000/${assetUrl}/${asset.symbol}/${endpoint}`;

    const response = await fetch(url);
    const data = (await response.json()) as StockPrice | CryptoRate;
    let lastPrice = asset.average_price;
    if (asset.asset_type === "stock") {
      const stockPrice = data as StockPrice;
      lastPrice = stockPrice.price;
    } else {
      const cryptoRate = data as CryptoRate;
      lastPrice = cryptoRate.dollar;
    }
    return { ...asset, last_price: lastPrice };
  }

  private onLoadPortfolioResolved = effect(async () => {
    if (this.portfolios.status() !== "resolved") {
      return;
    }

    const portfolio = this.portfolios.value()?.[0];
    if (!portfolio || portfolio.assets.length === 0) {
      return;
    }

    const updatedAssetPrices = await Promise.all(
      portfolio.assets.map((asset) => this.fetchAssetPrice(asset)),
    );

    portfolio.assets = updatedAssetPrices;
    this.value.set(portfolio);
  });

  private onPortfolioValueChanged = effect(() => {
    this.portfolioStore.setState(this.value());
  });
}
