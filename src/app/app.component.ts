import {Component} from '@angular/core';
import {Bets} from "./bets";
import {Player} from "./player";
import {Game} from "./game";
import {Deck} from "./deck.";
import {Dealer} from "./dealer";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [Bets, Game]
})

export class AppComponent {
  betAmount = 10;



  constructor(public _bets: Bets, public game: Game) {};
  /*initialize template*/
  bets = this._bets.getBets();
  player: any = {
    name: 'Nastya',
    balance: {
      amount: 200
    }
  };

  selectedBet = this.bets[0];

  dealer = Dealer;
  currentGame = null;

  onStartClick() {
    let playerName = this.player.name;
    let playerBalance = this.player.balance.amount;

    this.player = new Player(playerName, playerBalance);
    this.selectedBet.amount = this.betAmount;

    let data = {
       id: this.uniqueId(),
       player: this.player,
       deck: new Deck(),
       bet: this.selectedBet,
       dealer: Dealer
     };

    this.currentGame = this.game.processGame(data);
  }

  uniqueId() {
    let date = Date.now();
    let random = Math.random() * Math.random();

    return Math.floor(date * random);
  };
}
