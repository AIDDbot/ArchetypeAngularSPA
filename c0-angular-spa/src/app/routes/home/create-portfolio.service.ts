import { HttpClient } from "@angular/common/http";
import {
  inject,
  Injectable,
  Resource,
  ResourceStatus,
  signal,
} from "@angular/core";
import {
  DEFAULT_PORTFOLIO,
  Portfolio,
} from "../../shared/models/portfolio.type";

@Injectable({
  providedIn: "root",
})
export class CreatePortfolioService implements Resource<Portfolio> {
  private readonly url = "http://localhost:3000/portfolios";
  private http = inject(HttpClient);
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
      error: (error) => {
        const bodyError = (error as any).error;
        if (bodyError) {
          this.error.set(bodyError);
        } else {
          this.error.set(error);
        }
        this.status.set("error");
      },
    });
  }
}
