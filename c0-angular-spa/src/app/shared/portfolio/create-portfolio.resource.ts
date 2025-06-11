import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, Resource, ResourceStatus, signal } from "@angular/core";
import { PortfolioStore } from "./portfolio.store";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";

@Injectable()
export class CreatePortfolioResource implements Resource<Portfolio> {
  private readonly url = "http://localhost:3000/portfolios";
  private readonly http = inject(HttpClient);
  private readonly portfolioStore = inject(PortfolioStore);

  // Resource interface
  public value = signal<Portfolio>(DEFAULT_PORTFOLIO);
  public status = signal<ResourceStatus>("idle");
  public error = signal<Error | undefined>(undefined);
  public isLoading = signal<boolean>(false);
  public hasValue = (): this is Resource<Portfolio> => true;

  public createPortfolio(portfolio: Portfolio): void {
    this.status.set("loading");
    this.error.set(undefined);
    this.http.post<Portfolio>(`${this.url}`, portfolio).subscribe({
      next: (portfolio) => {
        this.value.set(portfolio);
        this.status.set("resolved");
      },
      error: (httpError) => {
        const bodyError = (httpError as any).error;
        if (bodyError) {
          this.error.set(bodyError);
        } else {
          this.error.set(httpError);
        }
        this.status.set("error");
      },
    });
  }

  private onCreatePortfolioResolved = effect(() => {
    if (this.status() === "resolved") {
      this.portfolioStore.setState(this.value());
    }
  });
}
