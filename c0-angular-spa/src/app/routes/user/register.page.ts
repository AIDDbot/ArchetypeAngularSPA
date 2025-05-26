import { Component, inject, Signal } from "@angular/core";
import { RegisterStoreService } from "./register.service";

@Component({
  imports: [],
  template: `
    <p>Fake Form</p>
    <button (click)="register()">Register</button>
    <pre>
      {{ userSignal() }}
      {{ errorSignal() }}
    </pre
    >
  `,
})
export default class RegisterPage {
  private registerStore = inject(RegisterStoreService);

  protected userSignal: Signal<string | undefined> =
    this.registerStore.userSignal;
  protected errorSignal: Signal<string | undefined> =
    this.registerStore.errorSignal;

  public register() {
    this.registerStore.register({
      email: "user@fake.com",
      password: "password",
    });
  }
}
