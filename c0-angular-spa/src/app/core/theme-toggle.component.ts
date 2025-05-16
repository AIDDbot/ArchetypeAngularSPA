import { Component, computed, effect, inject } from "@angular/core";
import { GlobalStore } from "../shared/global/global.store";
import { LogService } from "../shared/log.service";

@Component({
  selector: "app-theme-toggle",
  template: `
    <a aria-label="Toggle theme">
      <span (click)="toggleTheme()">{{ icon() }}</span>
    </a>
  `,
})
export class ThemeToggleComponent {
  private log = inject(LogService);
  private globalStore = inject(GlobalStore);
  private theme = this.globalStore.theme;

  protected icon = computed(() => (this.theme() === "light" ? "🔳" : "🔲"));
  protected toggleTheme(): void {
    this.globalStore.changeTheme(this.theme() === "light" ? "dark" : "light");
  }

  private onToggleEffect = effect(() => {
    const theme = this.theme();
    // document.documentElement.setAttribute("data-theme", theme);
    //this.setThemeToCache(theme);
    this.log.info(`Theme set to ${theme}`);
  });
}
