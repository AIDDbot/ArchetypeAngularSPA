import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideApp, withApp } from './core/app-token';
import { cacheInterceptor } from './core/cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([cacheInterceptor])),
    provideApp(withApp(environment.APP_NAME, environment.APP_VERSION, environment.APP_AUTHOR)),
  ],
};
