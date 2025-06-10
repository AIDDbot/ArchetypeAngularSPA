import { httpResource } from "@angular/common/http";
import {
  computed,
  Injectable,
  Resource,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  DEFAULT_STOCK_PRICE,
  StockPrice,
} from "../../../shared/portfolio/stock-price.type";

@Injectable()
export class LoadStockPriceResource implements Resource<StockPrice> {
  private readonly url = "http://localhost:3000/stocks/";
  private readonly getResource = httpResource<StockPrice>(
    () => `${this.url}${this.symbol()}/price`
  );
  public symbol: WritableSignal<string> = signal<string>("");
  public value = computed(
    () => this.getResource.value() ?? DEFAULT_STOCK_PRICE
  );
  public status = this.getResource.status;
  public error = this.getResource.error;
  public isLoading = this.getResource.isLoading;
  public hasValue = (): this is Resource<StockPrice> => true;
}
