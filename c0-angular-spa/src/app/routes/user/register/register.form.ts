import { Component, output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FormErrorsComponent } from "../../../shared/form-errors.component";
import { RegisterDto } from "./register-dto.type";

@Component({
  selector: "app-register-form",
  imports: [ReactiveFormsModule, FormErrorsComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <fieldset>
        <label for="name">Name</label>
        <input id="name" formControlName="name" />
        <label for="email">Email</label>
        <input id="email" formControlName="email" type="email" />
        <label for="password">Password</label>
        <input id="password" formControlName="password" type="password" />
        <label for="password2">Repeat Password</label>
        <input id="password2" formControlName="password2" type="password" />
      </fieldset>
      <button type="submit" [disabled]="form.invalid">Register</button>
      <app-form-errors [form]="form" />
    </form>
  `,
})
export class RegisterForm {
  public submit = output<RegisterDto>();
  protected form = new FormGroup({
    name: new FormControl("Pete", [Validators.required]),
    email: new FormControl("pete@fake.com", [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("password", [
      Validators.required,
      Validators.minLength(4),
    ]),
    password2: new FormControl("password", [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const body: RegisterDto = {
      name: this.form.value.name ?? "",
      email: this.form.value.email ?? "",
      password: this.form.value.password ?? "",
    };
    console.log("onSubmit", body);
    this.submit.emit(body);
  }
}
