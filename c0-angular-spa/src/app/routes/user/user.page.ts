import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  template: `
    <ul>
      <li><a routerLink="/user/login">Login</a></li>
      <li><a routerLink="/user/register">Register</a></li>
      <li><a routerLink="/user/reset-password">Reset Password</a></li>
    </ul>
  `,
})
export default class UserPage {}
