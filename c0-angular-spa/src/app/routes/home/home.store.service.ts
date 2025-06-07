import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  /* private readonly portfolioStore = inject(PortfolioStore);
  private readonly portfolioUrl = "http://localhost:3000/portfolios";
  public readonly portfolioResource = httpResource<Portfolio[]>(
    () => this.portfolioUrl
  );

  private onResourceValue = effect(() => {
    const portfolios = this.portfolioResource.value();
    if (portfolios) {
      const portfolio = portfolios[0];
      if (portfolio) {
        this.portfolioStore.updatePortfolio(portfolio);
      }
    }
  }); */
}
