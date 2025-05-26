import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";

export const registerFakeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== "POST" || !req.url.includes("register")) {
    return next(req);
  }
  const body: any = req.body as any;
  console.log("registerFakeInterceptor", body);
  if (Math.random() > 0.09) {
    return of(
      new HttpResponse({
        status: 201,
        body: {
          user: body.email || "not_a_user@fake.com",
          token: "a_fake_token" + new Date().getTime(),
        },
      })
    );
  } else {
    return throwError(() => new Error("Error registering user"));
  }
};
