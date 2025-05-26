import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, Signal, signal } from "@angular/core";
import { GlobalStore } from "../../../shared/global/global.store";
import { UserTokenDto } from "../user-token.dto.type";
import { RegisterDto } from "./register-dto.type";

@Injectable({
  providedIn: "root",
})
export class RegisterStoreService {
  private http = inject(HttpClient);
  private globalStore = inject(GlobalStore);
  private url = "http://localhost:3000/users/register";

  private userTokenSignal = signal<UserTokenDto | undefined>(undefined);
  private registerErrorSignal = signal<string | undefined>(undefined);

  private userTokenEffect = effect(() => {
    const tokenValue = this.userTokenSignal()?.token;
    if (tokenValue) {
      localStorage.setItem("token", tokenValue);
    } else {
      localStorage.removeItem("token");
    }
    const userValue = this.userTokenSignal()?.user;
    if (userValue) {
      this.globalStore.changeUser(userValue);
    } else {
      this.globalStore.changeUser("");
    }
  });

  public errorSignal: Signal<string | undefined> =
    this.registerErrorSignal.asReadonly();

  public register(registerDto: RegisterDto): void {
    this.userTokenSignal.set(undefined);
    this.registerErrorSignal.set(undefined);
    this.http.post<UserTokenDto>(this.url, registerDto).subscribe({
      next: (userToken) => this.userTokenSignal.set(userToken),
      error: (error) => this.registerErrorSignal.set(error.message),
    });
  }
}
