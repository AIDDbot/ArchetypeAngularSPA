import { httpResource } from "@angular/common/http";
import { computed, effect, inject, Injectable, Resource } from "@angular/core";
import { PortfolioStore } from "./portfolio.store";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";

@Injectable()
export class LoadPortfolioService implements Resource<Portfolio> {
  private readonly url = "http://localhost:3000/portfolios";
  private readonly getResource = httpResource<Portfolio[]>(() => this.url);
  private readonly portfolioStore = inject(PortfolioStore);
  public value = computed(
    () => this.getResource.value()?.[0] ?? DEFAULT_PORTFOLIO
  );
  public status = this.getResource.status;
  public error = this.getResource.error;
  public isLoading = this.getResource.isLoading;
  public hasValue = (): this is Resource<Portfolio> => true;

  public loadPortfolio(): void {
    this.getResource.reload();
  }
  private onLoadPortfolioResourceStatus = effect(() => {
    if (this.status() === "resolved") {
      this.portfolioStore.setState(this.value());
    }
  });
}
