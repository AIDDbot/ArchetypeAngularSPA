import { HttpClient, httpResource } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { DEFAULT_PORTFOLIO, Portfolio } from "./models/portfolio.type";

@Injectable({
  providedIn: "root",
})
export class PortfolioStore {
  private readonly url = "http://localhost:3000/portfolios";
  private http = inject(HttpClient);
  private readonly state = signal<Portfolio>(DEFAULT_PORTFOLIO);
  public readonly resource = httpResource<Portfolio[]>(() => this.url);

  public readonly portfolio = computed(() => this.state());
  public assetsValue = computed(() =>
    this.portfolio().assets.reduce(
      (acc, asset) => acc + asset.average_price * asset.units,
      0
    )
  );
  public updatePortfolio(portfolio: Portfolio): void {
    this.http.post<Portfolio>(`${this.url}`, portfolio).subscribe({
      next: (portfolio) => {
        this.state.set(portfolio);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public netValue = computed(() => this.portfolio().cash + this.assetsValue());

  private onResourceValue = effect(() => {
    const portfolios = this.resource.value();
    if (portfolios) {
      const portfolio = portfolios[0];
      if (portfolio) {
        this.state.set(portfolio);
      }
    }
  });
}
