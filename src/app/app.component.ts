import {Component} from '@angular/core';
import {DefaultBetType, DefaultBetValue, Bet, BetType, Game, Table, Wallet, Player} from "./game";
import {Deck} from "./deck.";
import {Dealer} from "./dealer";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  table: Table;
  player: Wallet;
  game: Game;

  constructor() {
    this.reset();
  };

  playerMoney = 0;
  betTypes = this.getBetType();
  currentBet = new Bet(DefaultBetType, DefaultBetValue);

  reset(){
    this.player = new Wallet(this.playerMoney, 'Player');
    this.table = new Table();
  }

  getBetType() {
    let arr = [];
    for (const type in BetType) {
      if (!Number(type) && +type != 0) {
        arr.push({
          name:type,
          value: BetType[type]
        });
      }
    }
    return arr;
  }

  onStartClick() {
    let playerName = this.player.name;
    //let playerBalance = this.player.balance.amount;

    //this.currentBet.amount = this.betAmount;

    let data = {
       player: this.player,
       deck: new Deck(),
       bet: this.currentBet,
       dealer: Dealer,
       text: ''
     };

    //this.currentGame = this.game.processGame(data);
  }

  onReady(){
    this.table.newGame(this.player);
  }

}
