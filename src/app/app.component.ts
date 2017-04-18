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

  public betInitial = {
    name: ''
  };

  public playerInitial = {
    name:'',
    purse: ''
  };

  bet: Bet;
  dialerFakeBet: Bet;
  player: Player;
  game: Game;
  cardDesk:CardDesk;
  dealer:Player;

  constructor(_cardDesk:CardDesk) {
     this.cardDesk = _cardDesk;
     this.dialerFakeBet = new Bet('Dealer', 20);
     this.dealer = new Player('Dealer', 1000000, this.dialerFakeBet);
  }

  run(betName:string) {
    this.bet = new Bet(betName, 100);
    this.player = new Player(this.playerInitial.name, parseInt(this.playerInitial.purse), this.bet);
    console.log('i am running');
    this.cardDesk.shuffle();

    this.player.setPoints(this.calculatePoints(2));
    this.dealer.setPoints(this.calculatePoints(2));

    this.isThirdCardNeeded(this.player.getPoints(), this.dealer.getPoints());

    let betWinner: string = this.checkWinner();
    this.checkBet(betWinner);
    this.player.updateBalance();
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

    if(playerBet.name == betWinner) {
      this.player.bet.isWin = true;
      console.log('Player bet won')
    } else {
      console.log('Dealer bet won')
    }
  }

  isThirdCardNeeded(playerPoints:number, dilerPoints:number) {
    if(playerPoints>=0 && playerPoints<=5) {
      this.player.setPoints(this.calculatePoints(1));
    }

    if(dilerPoints>=0 && dilerPoints<=4) {
      this.dealer.setPoints(this.calculatePoints(1));
    }

    if(dilerPoints == 5) {
      if(playerPoints >=0 && playerPoints<=5) {
        this.dealer.setPoints(this.calculatePoints(1));
      }
    }
  }

  calculatePoints(count:number) {
    let pointsFromArray = this.cardDesk.getCard(count).reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    if(pointsFromArray == 10) {
      return 0;
    }

    if(pointsFromArray > 10) {
      pointsFromArray = pointsFromArray - 10;

      if(pointsFromArray == 10) return 0;

      return pointsFromArray;
    }

    return pointsFromArray;
  }
}

