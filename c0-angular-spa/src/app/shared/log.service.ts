import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { APP } from "./app.token";
import { GlobalStore } from "./global/global.store";
import { LogEntryDTO } from "./log-entry-dto.type";

@Injectable({
  providedIn: "root",
})
export class LogService {
  // ToDo: use app token to add app name to the log
  // ToDo: add timestamp to the log
  // ToDo: add emoji based on log level

  private http: HttpClient = inject(HttpClient);
  private appToken = inject(APP);
  private globalStore = inject(GlobalStore);

  public debug(message: string) {
    console.debug(message);
  }
  public info(message: string) {
    console.log(message);
    this.sendLog(this.buildLogEntry(message, "info"));
  }
  public warn(message: string) {
    console.warn(message);
    this.sendLog(this.buildLogEntry(message, "warn"));
  }
  public error(message: string) {
    console.error(message);
    this.sendLog(this.buildLogEntry(message, "error"));
  }
  private buildLogEntry(message: string, level: string): LogEntryDTO {
    return {
      message,
      level,
      context: "",
      timestamp: Date.now(),
      source: this.appToken.name,
      ip: this.globalStore.state.ip || "127.0.0.1",
    };
  }

  private async sendLog(logEntry: LogEntryDTO) {
    const request = this.http.post("http://localhost:3000/logs", logEntry);
    // request.subscribe();
    await firstValueFrom(request);
  }
}
