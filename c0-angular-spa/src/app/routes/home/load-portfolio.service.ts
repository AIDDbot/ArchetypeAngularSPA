import { httpResource } from "@angular/common/http";
import { computed, Injectable, Resource } from "@angular/core";
import {
  DEFAULT_PORTFOLIO,
  Portfolio,
} from "../../shared/models/portfolio.type";

@Injectable({
  providedIn: "root",
})
export class LoadPortfolioService implements Resource<Portfolio> {
  private readonly url = "http://localhost:3000/portfolios";
  private readonly getResource = httpResource<Portfolio[]>(() => this.url);
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
}
