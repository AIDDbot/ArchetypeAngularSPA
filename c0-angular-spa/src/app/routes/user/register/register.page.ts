import { Component, inject, Signal } from "@angular/core";
import { RegisterDto } from "./register-dto.type";
import { RegisterForm } from "./register.form";
import { RegisterStoreService } from "./register.service";
@Component({
  imports: [RegisterForm],
  template: `
    <app-register-form (submit)="register($event)" />
    @if (error()) {
      <p>{{ error() }}</p>
    }
  `,
})
export default class RegisterPage {
  private registerStore = inject(RegisterStoreService);

  protected error: Signal<string | undefined> = this.registerStore.error;

  public register(registerDto: RegisterDto): void {
    this.registerStore.register(registerDto);
  }
}
