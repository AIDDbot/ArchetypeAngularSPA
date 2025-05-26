import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { RegisterDto } from "../routes/user/register/register-dto.type";

export const registerFakeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== "POST" || !req.url.includes("register")) {
    return next(req);
  }
  const body: RegisterDto = req.body as RegisterDto;
  if (Math.random() > 0.09) {
    return of(
      new HttpResponse({
        status: 201,
        body: {
          user: body.email,
          token: "a_fake_token" + new Date().getTime(),
        },
      })
    );
  } else {
    return throwError(() => new Error("Error registering user"));
  }
};
