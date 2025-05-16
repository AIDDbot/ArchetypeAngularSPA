import { httpResource } from "@angular/common/http";
import { effect, inject, Injectable } from "@angular/core";
import { GlobalStore } from "../../shared/global/global.store";
import { IpApi } from "./ip-api.type";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  private readonly IP_API_URL = "http://ip-api.com/json";
  private readonly globalStore = inject(GlobalStore);

  public ipinfo = httpResource<IpApi>(this.IP_API_URL);

  private onIpinfoChange = effect(() => {
    const ipinfo = this.ipinfo.value();
    if (!ipinfo) return;
    this.globalStore.changeIp(ipinfo.query);
  });
}
