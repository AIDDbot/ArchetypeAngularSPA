import { httpResource } from "@angular/common/http";
import { computed, effect, inject, Injectable, Resource } from "@angular/core";
import { PortfolioStore } from "./portfolio.store";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";

@Injectable()
export class LoadPortfolioResource implements Resource<Portfolio> {
  private readonly url = "http://localhost:3000/portfolios";
  private readonly portfolios = httpResource<Portfolio[]>(() => this.url);
  private readonly portfolioStore = inject(PortfolioStore);

  public value = computed(() => this.portfolios.value()?.[0] ?? DEFAULT_PORTFOLIO);
  public status = this.portfolios.status;
  public error = this.portfolios.error;
  public isLoading = this.portfolios.isLoading;
  public hasValue = (): this is Resource<Portfolio> => true;

  public loadPortfolio(): void {
    this.portfolios.reload();
  }
  private onLoadPortfolioResolved = effect(() => {
    if (this.status() === "resolved") {
      this.portfolioStore.setState(this.value());
    }
  });
}
