import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { cacheInterceptor } from "./core/cache.interceptor";
import { provideApp, withData } from "./shared/app.token";

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([cacheInterceptor])),
    provideApp(
      withData(
        environment.APP_NAME,
        environment.APP_VERSION,
        environment.APP_AUTHOR
      )
    ),
  ],
};
