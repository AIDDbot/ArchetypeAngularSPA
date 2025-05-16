import { Component, computed, inject } from "@angular/core";
import { GlobalStore } from "../shared/global/global.store";

@Component({
  selector: "app-theme-toggle",
  template: `
    <a aria-label="Toggle theme">
      <span (click)="toggleTheme()">{{ icon() }}</span>
    </a>
  `,
})
export class ThemeToggleComponent {
  private globalStore = inject(GlobalStore);
  private theme = this.globalStore.theme;

  protected icon = computed(() => (this.theme() === "light" ? "🔳" : "🔲"));

  protected toggleTheme(): void {
    const newTheme = this.theme() === "light" ? "dark" : "light";
    this.globalStore.changeTheme(newTheme);
  }
}
