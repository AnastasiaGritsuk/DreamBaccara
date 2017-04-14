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

  public bet = {
    name: ''
  };

  public playerInitial = {
    name:'',
    purse: 0
  };
  player: Player;
  game: Game;
  cardDesk:CardDesk;
  dealer:Player;
  balance: Balance;

  constructor(_cardDesk:CardDesk) {
     this.cardDesk = _cardDesk;
     this.dealer = new Player('Dealer', 1000000);
  }

  run(betName:string) {
    this.player = new Player(this.playerInitial.name, this.playerInitial.purse);
    console.log('i am running');
    this.player.setBet(betName);
    this.cardDesk.shuffle();

    let pointsPlayer = this.cardDesk.getCard(2).reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    this.player.setPoints(this.calculatePoints(pointsPlayer));

    let pointsDealer = this.cardDesk.getCard(2).reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    this.dealer.setPoints(this.calculatePoints(pointsDealer));

    let betWinner: string = this.checkWinner();
    this.checkBet(betWinner);
  }

  checkWinner(){
    let pPoints = this.player.getPoints();
    let dPoints = this.dealer.getPoints();

    console.log('checkWinner: pPoints ' + pPoints);
    console.log('checkWinner: dPoints ' + dPoints);

    if(pPoints == dPoints) {
      console.log('Tie')
      return 'tieBet';
    }
    if(pPoints>dPoints) {
      console.log('Player won');
      return 'playerBet';
    }else {
      console.log('Dealer won');
      return 'bankBet';
    }
  }

  checkBet(betWinner:string) {
    let playerBet = this.player.getBet();

    if(playerBet == betWinner) {
      console.log('Player bet won')
    } else {
      console.log('Dealer bet won')
    }
  }

  calculatePoints(points:number) {
    if(points == 10) {
      return 0;
    }
    if(points > 10) {
      return points - 10;
    }

    return points;

  }


  /*list of events
  * user presses 'Start game' -> run on DocumentView, player with preconditions
  * bet
  * */
}

