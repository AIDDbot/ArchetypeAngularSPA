import { Component, input } from "@angular/core";

@Component({
  imports: [],
  template: ` <h1>User: {{ userId() }}</h1> `,
})
export default class UserPage {
  public userId = input<string>();
}
