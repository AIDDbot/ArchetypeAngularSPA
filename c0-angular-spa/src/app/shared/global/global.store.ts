import {
  computed,
  effect,
  EffectRef,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";
import { Router } from "@angular/router";
import { CacheService } from "../cache.service";
import { defaultGlobalState, GlobalState } from "./global.type";

@Injectable({
  providedIn: "root",
})
export class GlobalStore {
  private cache: CacheService = inject(CacheService);
  private router = inject(Router);
  private readonly state: WritableSignal<GlobalState> = signal<GlobalState>(
    this.getInitialState()
  );

  private getInitialState(): GlobalState {
    const cachedState = this.cache.get<GlobalState>("global");
    return cachedState || defaultGlobalState;
  }

  public readonly theme: Signal<string> = computed(() => this.state().theme);

  public readonly ip: Signal<string> = computed(
    () => this.state().ip || "127.0.0.1"
  );

  public changeTheme(theme: string): void {
    this.state.update((state) => ({ ...state, theme }));
  }

  public changeUser(user: string): void {
    this.state.update((state) => ({ ...state, user }));
  }

  public changeIp(ip: string): void {
    this.state.update((state) => ({ ...state, ip }));
  }

  private onAnyChangeEffect: EffectRef = effect(() => {
    const state = this.state;
    this.cache.set("global", state);
  });

  private onThemeChange: EffectRef = effect(() => {
    const theme = this.theme();
    document.documentElement.setAttribute("data-theme", theme);
  });

  private onUserChange: EffectRef = effect(() => {
    const user = this.state().user;
    if (user) {
      this.router.navigate(["/user"]);
    }
  });
}
