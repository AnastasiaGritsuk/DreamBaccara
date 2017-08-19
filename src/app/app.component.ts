import {Component} from '@angular/core';
import {Table} from "./table";
import {BetType} from "./bet";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  table: Table;

  constructor() {
    this.bets = this.getBetType();
    this.table = new Table();
  };

  //currentBet = //new Bet(DefaultBetType, DefaultBetValue);
  bets = this.getBetType();

  getBetType() {
    let arr = [];
    for (const item in BetType){

    }
    return arr;
  }

  getDealerBalance(){
    return this.table.dealerMoney.amount;
  }

  getPlayerBalance(){
    return this.table.playerMoney.amount;
  }

  getDealerCards(){
    return this.table.history.last().dealer;
  }

  getPlayerCards(){
    return this.table.history.last().player;
  }

  onNew(){
    this.table = new Table();
  }

  onNext(){

  }

  onBet(){
    this.table.bet(this.currentBetType, this.currentBetValue);
  }
}
