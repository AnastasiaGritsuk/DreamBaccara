import {Component} from '@angular/core';
import {Deck} from './deck.'
import {Balance} from "./balance";
import {Bet} from "./bet";
import {Game} from "./game";
import {Player} from "./player";
import {Dealer} from "./dealer";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [Deck, Balance, Bet, Game, Player]
})

export class AppComponent {

  public betInitial = {
    name: ''
  };

  public playerInitial = {
    name:'',
    purse: ''
  };

  public betAmount = 0;

  public isGameStarted = false;

  bet: Bet;
  dialerFakeBet: Bet;
  player: Player;
  game: Game;
  dealer:Player;
  cardDesk:Deck;

  constructor() {
     this.dialerFakeBet = new Bet('Dealer', 20);
     this.dealer = new Player('Dealer', 1000000, this.dialerFakeBet);
  }

  onStartClick(betName:string) {
    this.isGameStarted = true;
    this.bet = new Bet(betName, this.betAmount);
    this.player = new Player(this.playerInitial.name, parseInt(this.playerInitial.purse), this.bet);
    console.log('i am running');

    this.cardDesk = new Deck();
    this.cardDesk.shuffle();
    this.player.receiveCards(this.getCardsFromCardDesk(2));
    this.dealer.receiveCards(this.getCardsFromCardDesk(2));

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
      this.player.receiveCards(this.getCardsFromCardDesk(1));
    }

    if(dilerPoints>=0 && dilerPoints<=4) {
      this.dealer.receiveCards(this.getCardsFromCardDesk(1));
    }

    if(dilerPoints == 5) {
      if(playerPoints >=0 && playerPoints<=5) {
        this.dealer.receiveCards(this.getCardsFromCardDesk(1));
      }
    }
  }

  getCardsFromCardDesk(count:number) {
    return this.cardDesk.getCard(count);
  }
}

