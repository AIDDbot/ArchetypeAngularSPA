import { HttpClient, httpResource } from "@angular/common/http";
import {
  computed,
  effect,
  inject,
  Injectable,
  ResourceStatus,
  signal,
} from "@angular/core";
import { CreateTransactionDto } from "./models/create-transaction.dto";
import { DEFAULT_PORTFOLIO, Portfolio } from "./models/portfolio.type";

@Injectable({
  providedIn: "root",
})
export class PortfolioStore {
  private readonly url = "http://localhost:3000/portfolios";
  private http = inject(HttpClient);
  private readonly state = signal<Portfolio>(DEFAULT_PORTFOLIO);
  public readonly getResource = httpResource<Portfolio[]>(() => this.url);

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

  public addAssetResource = {
    value: signal<unknown>(null),
    status: signal<ResourceStatus>("idle"),
    error: signal<Error | undefined>(undefined),
    isLoading: signal<boolean>(false),
  };

  public addAssetErrorMessage = computed(() => {
    const error = this.addAssetResource.error();
    if (error) {
      return error.message;
    }
    return "";
  });

  public addAsset(transaction: CreateTransactionDto): void {
    this.addAssetResource.status.set("loading");
    this.addAssetResource.error.set(undefined);
    this.http
      .post<Portfolio>(
        `${this.url}/${this.portfolio().id}/transactions`,
        transaction
      )
      .subscribe({
        next: () => {
          this.getResource.reload();
          this.addAssetResource.status.set("resolved");
        },
        error: (error) => {
          const bodyError = (error as any).error;
          if (bodyError) {
            this.addAssetResource.error.set(bodyError);
          } else {
            this.addAssetResource.error.set(error);
          }
          this.addAssetResource.status.set("error");
        },
      });
  }

  public netValue = computed(() => this.portfolio().cash + this.assetsValue());

  private onResourceValue = effect(() => {
    const portfolios = this.getResource.value();
    if (portfolios) {
      const portfolio = portfolios[0];
      if (portfolio) {
        this.state.set(portfolio);
      }
    }
  });

  private onResourceError = effect(() => {
    const error = this.getResource.error();
    if (error) {
      console.error(error);
    }
  });
}
