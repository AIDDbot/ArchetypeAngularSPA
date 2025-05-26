import { HttpClient } from "@angular/common/http";
import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
} from "@angular/core";
import { UserTokenDto } from "../user-token.dto.type";
import { RegisterDto } from "./register-dto.type";

@Injectable({
  providedIn: "root",
})
export class RegisterStoreService {
  private http = inject(HttpClient);
  private url = "http://localhost:3000/users/register";

  private userTokenSignal = signal<UserTokenDto | undefined>(undefined);
  private registerErrorSignal = signal<string | undefined>(undefined);

  private tokenEffect = effect(() => {
    const tokenValue = this.userTokenSignal()?.token;
    if (tokenValue) {
      console.log("Token value", tokenValue);
    }
  });

  public userSignal = computed<string | undefined>(
    () => this.userTokenSignal()?.user
  );
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
