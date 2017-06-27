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

  selectedBet: any = null;

  constructor(public _bets: Bets, public game: Game) {};
  /*initialize template*/
  bets = this._bets.getBets();
  player: any = {
    name: 'Nastya',
    balance: 200
  };

  dealer = Dealer;

  onStartClick() {
    let playerName = this.player.name;
    let playerBalance = this.player.balance;

    this.player = new Player(playerName, playerBalance);
    this.selectedBet.amount = this.betAmount;
    this.game.currentGame = {
      id: 32423,
      player: this.player,
      deck: new Deck(),
      bet: this.selectedBet,
      dealer: Dealer
    };

    console.log('i am running');

    this.game.processGame();
    this.game.showResults();
  }
}
