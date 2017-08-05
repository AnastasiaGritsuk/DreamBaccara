import {Component} from '@angular/core';
import {DefaultBetType, DefaultBetValue, Bet, BetType, Game, Player} from "./game";
import {Table} from "./table";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  table: Table;
  player: Player;
  game: Game;
  history:Game[];

  constructor() {
    this.reset();
  };

  currentBet = new Bet(DefaultBetType, DefaultBetValue);

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

  getDealerBalance(){
    return this.table.bankMoney.amount;
  }

  getDealerCards(){
    return this.table.dealer.cards;
  }

  getPlayerCards(){
    return this.player.cards;
  }

  reset(){
    this.table = new Table();
    this.player = this.table.newPlayer();
  }

  onReady(){
    if(this.game != null){
      this.history.push(this.game);
    }

    this.game = this.table.newGame(this.player);
  }

  onBet(){
    this.game.makeBet(this.currentBet);
  }

  onShuffle(){
    this.game.shuffle();
  }

  onDealt1(){
    this.game.dealt1();
  }

  onDealt2(){
    this.game.dealt2();
  }

  //review rules
  onDealtDealer(){
    this.game.dealtDealer();
    this.game.finishGame();
  }
}
