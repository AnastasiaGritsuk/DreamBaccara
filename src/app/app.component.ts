import {Component} from '@angular/core';
import {CardDesk} from './cardDesk.'
import {Balance} from "./balance";
import {Bet} from "./bet";
import {Game} from "./game";
import {Player} from "./player";
import {Dealer} from "./dealer";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [CardDesk, Balance, Bet, Game, Player]
})

export class AppComponent {
  game: Game;
  player:Player;
  bet:Bet;
  cardDesk:CardDesk;
  dealer:Player;
  balance: Balance;

  constructor(_cardDesk:CardDesk) {
     this.player = new Player('Angola', 500);
     this.cardDesk = _cardDesk;
     this.bet = new Bet("", 1);
     this.dealer = new Player('Dealer', 1000000);
  }

  run(bet:Bet) {
    console.log('i am running');
    this.player.setBet(bet);
    this.cardDesk.shuffle();

    let pointsPlayer = this.cardDesk.getCard(2).reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    this.player.setPoints(pointsPlayer);

    let pointsDealer = this.cardDesk.getCard(2).reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    this.dealer.setPoints(pointsDealer);
    let betWinner: Bet = this.checkWinner();
    this.checkBet(betWinner);
  }

  checkWinner(){
    let pPoints = this.player.getPoints();
    let dPoints = this.dealer.getPoints();

    if(pPoints == dPoints) {
      console.log('Tie')
      return {name:'Tie',rate:1}
    }
    if(pPoints>dPoints) {
      console.log('Player won');
      return {name:'Player',rate:1}
    }else {
      console.log('Dealer won');
      return {name:'Dealer',rate:1}
    }
  }

  checkBet(betWinner:Bet) {
    let playerBet = this.player.getBet();

    if(playerBet.name == betWinner.name) {
      console.log('Player won')
    } else {
      console.log('Dealer won')
    }
  }


  /*list of events
  * user presses 'Start game' -> run on DocumentView, player with preconditions
  * bet
  * */
}

