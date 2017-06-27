import {Component} from '@angular/core';
import {Bets} from "./bets";
import {Player} from "./player";
import {GameSession} from "./gameSession";
import {Dealer} from "./dealer";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  public betAmount = 10;
  bets = new Bets().getBets();
  selectedBet: any = null;
  gameSession: GameSession;

  gamesHistory = {};
  dealer = Dealer;

  player = new Player('Nastya', 2000);
  winnerBetText = '';

  constructor() {};

  onStartClick() {

    this.selectedBet.amount = this.betAmount;
    this.gameSession = new GameSession(this.player, this.selectedBet);
    this.gamesHistory[this.player.id] = this.gameSession; // add after game finished
    console.log('i am running');

    this.gameSession.processGame();
    this.gameSession.showResults();
  }
}
