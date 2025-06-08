import {
  computed,
  inject,
  Injectable,
  Resource,
  ResourceStatus,
  signal,
} from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { CreateTransactionDto } from "../../../shared/models/create-transaction.dto";
import {
  DEFAULT_PORTFOLIO,
  Portfolio,
} from "../../../shared/models/portfolio.type";
import { PortfolioStore } from "../../../shared/portfolio.store";

@Injectable({
  providedIn: "root",
})
export class BuyAssetService implements Resource<Portfolio> {
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly url = "http://localhost:3000/portfolios";
  private http = inject(HttpClient);
  public value = signal<Portfolio>(DEFAULT_PORTFOLIO);
  public status = signal<ResourceStatus>("idle");
  public error = signal<Error | undefined>(undefined);
  public isLoading = signal<boolean>(false);
  public hasValue = (): this is Resource<Portfolio> => true;
  private id = computed(() => this.portfolioStore.portfolio().id);
  public buyAsset(transaction: CreateTransactionDto): void {
    this.status.set("loading");
    this.error.set(undefined);
    this.http
      .post<Portfolio>(`${this.url}/${this.id()}/transactions`, transaction)
      .subscribe({
        next: () => {
          // reload portfolio
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
