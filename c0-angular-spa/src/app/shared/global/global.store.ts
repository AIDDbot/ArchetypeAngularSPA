import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { CacheService } from "../cache.service";
import { defaultGlobalState, GlobalState } from "./global.type";

@Injectable({
  providedIn: "root",
})
export class GlobalStore {
  private cache = inject(CacheService);
  private readonly store = signal<GlobalState>(this.getInitialState());

  private getInitialState(): GlobalState {
    const cachedState = this.cache.get("global") as GlobalState;
    return cachedState || defaultGlobalState;
  }

  public get state() {
    return this.store();
  }

  public readonly theme = computed(() => this.state.theme);

  public changeTheme(theme: string) {
    this.store.update((state) => ({ ...state, theme }));
  }

  public changeUser(user: string) {
    this.store.update((state) => ({ ...state, user }));
  }

  public changeIp(ip: string) {
    this.store.update((state) => ({ ...state, ip }));
  }

  private onChangeEffect = effect(() => {
    const state = this.state;
    this.cache.set("global", state);
  });

  private onThemeChange = effect(() => {
    const theme = this.theme();
    document.documentElement.setAttribute("data-theme", theme);
  });
}
