import { httpResource } from "@angular/common/http";
import { computed, Injectable, Resource, signal } from "@angular/core";
import { AssetType } from "../../../shared/portfolio/asset.type";

@Injectable()
export class LoadSymbolsResource
  implements Resource<{ symbol: string; name: string }[]>
{
  private readonly apiUrl = "http://localhost:3000/";
  private readonly getResource = httpResource<
    { symbol: string; name: string }[]
  >(() => `${this.apiUrl}${this.assetResource()}`);

  public assetType = signal<AssetType>("stock");
  private assetResource = computed(() =>
    this.assetType() === "stock" ? "stocks" : "cryptos"
  );

  public value = computed(() => this.getResource.value() ?? []);
  public status = this.getResource.status;
  public error = this.getResource.error;
  public isLoading = this.getResource.isLoading;
  public hasValue = (): this is Resource<{ symbol: string; name: string }[]> =>
    true;
}
