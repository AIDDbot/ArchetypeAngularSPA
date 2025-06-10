import { httpResource } from "@angular/common/http";
import { computed, Injectable, Resource, signal } from "@angular/core";
import { AssetType } from "../../../shared/portfolio/asset.type";

export type AnySymbol = { symbol: string; name: string };

@Injectable()
export class LoadSymbolsResource implements Resource<AnySymbol[]> {
  private readonly apiUrl = "http://localhost:3000";
  private readonly getResource = httpResource<AnySymbol[]>(
    () => `${this.apiUrl}/${this.assetUrl()}`
  );

  public assetType = signal<AssetType>("stock");
  private assetUrl = computed(() =>
    this.assetType() === "stock" ? "stocks" : "cryptos"
  );

  public value = computed(() => this.getResource.value() ?? []);
  public status = this.getResource.status;
  public error = this.getResource.error;
  public isLoading = this.getResource.isLoading;
  public hasValue = (): this is Resource<AnySymbol[]> => true;
}
