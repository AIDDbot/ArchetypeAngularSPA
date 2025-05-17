import { Routes } from "@angular/router";

export const USER_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./user.page"),
  },
  {
    path: "login",
    loadComponent: () => import("./login.page"),
  },
  {
    path: "register",
    loadComponent: () => import("./register.page"),
  },
  {
    path: "reset-password",
    loadComponent: () => import("./reset-password.page"),
  },
];
