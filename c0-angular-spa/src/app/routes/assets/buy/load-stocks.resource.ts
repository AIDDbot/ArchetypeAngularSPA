import { httpResource } from "@angular/common/http";
import { computed, Injectable, Resource } from "@angular/core";
import { Stock } from "../../../shared/portfolio/stock.type";

@Injectable()
export class LoadStocksResource implements Resource<Stock[]> {
  private readonly url = "http://localhost:3000/stocks";
  private readonly getResource = httpResource<Stock[]>(() => this.url);

  public value = computed(() => this.getResource.value() ?? []);
  public status = this.getResource.status;
  public error = this.getResource.error;
  public isLoading = this.getResource.isLoading;
  public hasValue = (): this is Resource<Stock[]> => true;
}
