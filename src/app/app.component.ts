import {Component} from '@angular/core';
import {DefaultBetType, DefaultBetValue, Bet, BetType, Game, Table, Wallet, Player} from "./game";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  table: Table;
  player: Wallet;
  game: Game;
  history:Game[];

  constructor() {
    this.reset();
  };

  playerMoney = 0;
  betTypes = this.getBetType();
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

  reset(){
    this.player = new Wallet(this.playerMoney, 'Player');
    this.table = new Table();
  }

  onReady(){
    if(this.game != null){
      this.history.push(this.game);
    }
    this.table.newGame(this.player);
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
