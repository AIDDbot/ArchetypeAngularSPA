import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // Local storage cache
  public set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): unknown | undefined {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }
}
