import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";

export const portfolioFakeInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes("portfolio")) {
    return next(req);
  }
  if (req.method !== "GET") {
    return next(req);
  }
  return of(
    new HttpResponse({
      body: {
        id: "1",
        userId: "1",
        cash: 98452.34,
        assets: [
          {
            id: "1",
            name: "Apple stocks",
            category: "stock",
            quantity: 88,
            price: 203.08,
            lastUpdated: new Date(),
          },
          {
            id: "2",
            name: "Bitcoin",
            category: "crypto",
            quantity: 0.02,
            price: 90450,
            lastUpdated: new Date(),
          },
          {
            id: "3",
            name: "Microsoft stocks",
            category: "stock",
            quantity: 14,
            price: 462.76,
            lastUpdated: new Date(),
          },
        ],
        lastUpdated: new Date(),
      },
    })
  );
};
