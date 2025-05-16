import { httpResource, HttpResourceRef } from "@angular/common/http";
import { effect, inject, Injectable } from "@angular/core";
import { GlobalStore } from "../../shared/global/global.store";
import { IpApi } from "./ip-api.type";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  private readonly IP_API_URL = "http://ip-api.com/json";
  private readonly globalStore = inject(GlobalStore);

  public ipApiResource: HttpResourceRef<IpApi | undefined> =
    httpResource<IpApi>(this.IP_API_URL);

  private onIpApiChange = effect(() => {
    const ipApi = this.ipApiResource.value();
    if (!ipApi) return;
    this.globalStore.changeIp(ipApi.query);
  });
}
