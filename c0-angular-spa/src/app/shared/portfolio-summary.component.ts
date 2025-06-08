import { CurrencyPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { PortfolioStore } from "./portfolio.store";

@Component({
  selector: "app-portfolio-summary",
  imports: [CurrencyPipe],
  template: `Assets:{{ assetsValue() | currency }} Cash:{{
      cash() | currency
    }}`,
})
export class PortfolioSummaryComponent {
  private readonly portfolioStore = inject(PortfolioStore);
  protected assetsValue = computed(() => this.portfolioStore.assetsValue());
  protected cash = computed(() => this.portfolioStore.cash());
}
