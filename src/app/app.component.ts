import {Component} from '@angular/core';
import {Player} from "./player";
import {DefaultBetType, DefaultBetValue, Bet, BetType, Game} from "./game";
import {Deck} from "./deck.";
import {Dealer} from "./dealer";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [Game]
})

export class AppComponent {
  isGameStarted = false;

  constructor(public game: Game) {};
  /*initialize template*/
  player: any = {
    name: 'Nastya',
    balance: {
      amount: 200
    }
  };

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

  betTypes = this.getBetType();
  currentBet = new Bet(DefaultBetType, DefaultBetValue);

  dealer = Dealer;
  currentGame = null;

  onStartClick() {
    let playerName = this.player.name;
    let playerBalance = this.player.balance.amount;

    this.player = new Player(playerName, playerBalance);
    //this.currentBet.amount = this.betAmount;

    let data = {
       id: this.uniqueId(),
       player: this.player,
       deck: new Deck(),
       bet: this.currentBet,
       dealer: Dealer,
       text: ''
     };

    this.currentGame = this.game.processGame(data);
    this.isGameStarted = true;
  }

  uniqueId() {
    let date = Date.now();
    let random = Math.random() * Math.random();

    return Math.floor(date * random);
  };

  renewGame() {
    this.currentGame = null;
    this.isGameStarted = false;
    this.player = {
      name: '',
      balance: {
        amount: 0
      }
    };
    this.dealer.points = 0;
    this.dealer.cards = [];
  }
}
