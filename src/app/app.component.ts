import { Component } from '@angular/core';
import { CardDesk } from './cardDesk.component'
import {Balance} from "./balance";
import {Bet} from "./bet";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [CardDesk, Balance, Bet]
})
export class AppComponent {
  userBalance: Object;
  bankBet: Object;

  constructor(public cardDesk: CardDesk) {
    this.userBalance = new Balance(30);
    this.bankBet = new Bet('Bank', 100);
  }
}
