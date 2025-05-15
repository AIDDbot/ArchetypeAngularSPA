import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { of } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { CacheService } from "../shared/cache.service";
import { LogService } from "../shared/log.service";

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== "GET") {
    return next(req);
  }

  const cache = inject(CacheService);
  const log = inject(LogService);

  const cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    log.info(`Cache hit for ${req.url}`);
    return of(cachedResponse as HttpResponse<unknown>);
  }

  return next(req).pipe(
    filter((event) => event instanceof HttpResponse),
    tap((event) => {
      cache.set(req.url, event as HttpResponse<unknown>);
      log.info(`Cache set for ${req.url}`);
    })
  );
};
