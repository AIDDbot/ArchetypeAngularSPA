import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { cacheInterceptor } from "./core/cache.interceptor";
import { provideEnv, withData } from "./shared/env/env.token";
import { GlobalStore } from "./shared/global/global.store";
import { LogService } from "./shared/log/log.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideEnv(
      withData(
        environment.APP_NAME,
        environment.APP_VERSION,
        environment.APP_AUTHOR
      )
    ),
    provideAppInitializer(async () => {
      const globalStore = inject(GlobalStore);
      const logService = inject(LogService);
      logService.info(`App initialized at ${globalStore.state.ip}`);
    }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([cacheInterceptor])),
  ],
};
