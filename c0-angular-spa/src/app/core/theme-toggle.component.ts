import { Component, computed, effect, inject, signal } from '@angular/core';
import { CacheService } from '../shared/cache.service';
import { LogService } from '../shared/log.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <a aria-label="Toggle theme">
      <span (click)="toggleTheme()">{{ icon() }}</span>
    </a>
  `,
})
export class ThemeToggleComponent {
  private log = inject(LogService);
  private cache = inject(CacheService);
  private theme = signal(this.getThemeFromCache());

  protected icon = computed(() => (this.theme() === "light" ? "🔳" : "🔲"));
  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === "light" ? "dark" : "light"));
  }

  private onToggleEffect = effect(() => {
    const theme = this.theme();
    document.documentElement.setAttribute("data-theme", theme);
    this.setThemeToCache(theme);
    this.log.info(`Theme set to ${theme}`);
  });
  private getThemeFromCache(): string {
    return this.cache.get("theme") as string || "light";
  }
  private setThemeToCache(theme: string): void {
    this.cache.set("theme", theme);
  }
}
