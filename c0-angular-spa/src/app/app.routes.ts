import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./routes/home/home.page"),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./routes/user/user.routes").then((m) => m.USER_ROUTES),
  },
  {
    path: "assets/add-new",
    loadComponent: () => import("./routes/assets/add-new/add-new-asset.page"),
  },
];
