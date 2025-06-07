import { JsonPipe } from "@angular/common";
import {
  Component,
  computed,
  input,
  InputSignal,
  ResourceRef,
} from "@angular/core";
import { ErrorComponent } from "./error.component";
import { WaitingComponent } from "./waiting.component";

@Component({
  selector: "app-resource",
  imports: [WaitingComponent, ErrorComponent, JsonPipe],
  template: `
    <pre>Value: {{ resource().value() | json }}</pre>
    <pre>Status: {{ resource().status() | json }}</pre>
    <pre>Error: {{ resource().error() | json }}</pre>
    @if (resource().isLoading()) {
      <app-waiting />
    } @else if (resource().error()) {
      <app-error [message]="error()" />
    } @else {
      <ng-content />
    }
  `,
})
export class ResourceComponent {
  public resource: InputSignal<ResourceRef<any>> =
    input.required<ResourceRef<any>>();
  protected status = computed(() => this.resource().status());
  protected error = computed(() => {
    const error = this.resource().error();
    if (error) {
      return error.message;
    }
    return "Unknown error";
  });
}
