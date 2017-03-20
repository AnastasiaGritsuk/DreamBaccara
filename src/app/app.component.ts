import { Component } from '@angular/core';
import { CardDesk } from './cardDesk.component'
import {Balance} from "./balance";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [CardDesk, Balance]
})
export class AppComponent {
  userBalance: Object;

  constructor(public cardDesk: CardDesk) {
    this.userBalance = new Balance(30);
  }
}
