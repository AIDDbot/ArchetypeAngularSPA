import { httpResource } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  private readonly IP_API_URL = "http://ip-api.com/json";
  // ToDo: make the result available for the whole app in a global store

  public ipinfo = httpResource(this.IP_API_URL);
}
