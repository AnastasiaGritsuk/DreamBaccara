import {Component} from '@angular/core';
import {Deck} from './deck.'
import {Balance} from "./balance";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  public betAmount = 10;
  cardDeck: Deck;
  bets = [
    {
      name: 'Player',
      value: 'playerBet',
      multiplier: 1,
      isWin: false,
      amount: 0
    }, {
      name: 'Bank',
      value: 'bankBet',
      multiplier: 0.95,
      isWin: false,
      amount: 0
    }, {
      name: 'Tie',
      value: 'tieBet',
      multiplier: 0.9,
      isWin: false,
      amount: 0
    }
  ];
  selectedBet: any = null;

  dealer = {
    name: 'Dialer',
    points: 0,
    balance: new Balance(200),
    cards: []
  };

  player = {
    name: 'Demo',
    points: 0,
    balance: new Balance(200),
    cards: [],
    bet: null
  };
  winnerPlayerText = '';
  winnerBetText = '';

  constructor() {}

  onStartClick() {
    this.selectedBet.amount = this.betAmount;
    this.player.bet = this.selectedBet;
    console.log('i am running');

    this.cardDeck = new Deck();
    this.cardDeck.create();
    this.cardDeck.shuffle();

    this.updateCards(this.player, 2);
    this.updateCards(this.dealer, 2);

    this.isThirdCardNeeded(this.player.points, this.dealer.points);

    let betWinner: string = this.checkWinner();
    this.checkBet(betWinner);
    this.updateBalance();
  }

  updateCards(player, cardsCount){
    let newCards = this.getCardsFromCardDesk(cardsCount);
    player.cards = player.cards.concat(newCards);
    player.points = this.calculatePoints(player.cards);// it is not update cards
  }

  checkWinner() {
    let pPoints = this.player.points;
    let dPoints = this.dealer.points;

    console.log('checkWinner: pPoints ' + pPoints);
    console.log('checkWinner: dPoints ' + dPoints);

    if (pPoints == dPoints) {
      this.winnerPlayerText = 'Tie won';
      return 'tieBet';
    }
    if (pPoints > dPoints) {
      this.winnerPlayerText = 'Player won';
      return 'playerBet';
    } else {
      this.winnerPlayerText = 'Dealer won';
      return 'bankBet';
    }
  }

  checkBet(betWinner: string) {
    if (this.player.bet.value == betWinner) {
      this.player.bet.isWin = true;
      this.winnerBetText = 'Player bet won';
    } else {
      this.winnerBetText = 'Player bet lost';
    }
  }

  isThirdCardNeeded(playerPoints: number, dealerPoints: number) {
    if (playerPoints >= 0 && playerPoints <= 5) {
      this.updateCards(this.player, 1);
    }

    if (dealerPoints >= 0 && dealerPoints <= 4) {
      this.updateCards(this.dealer, 1);
    }

    if (dealerPoints == 5) {
      if (playerPoints >= 0 && playerPoints <= 5) {
        this.updateCards(this.dealer, 1);
      }
    }
  }

  getCardsFromCardDesk(count: number) {
    return this.cardDeck.getCard(count);
  }

  getWinBet() {
    return this.selectedBet.multiplier * this.betAmount;
  }

  updateBalance() {
    if (this.player.bet.isWin) {
      let sum = this.getWinBet();
      this.player.balance.increase(sum);
    } else {
      this.player.balance.decrease(this.player.bet.amount);
    }
  }

  calculatePoints(arr: any[]) {
    let points = arr.map((obj)=>{
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    });

    if (points == 10) {
      return 0;
    }

    if (points > 10) {
      points = points - 10;

      if (points == 10) return 0;

      return points;
    }

    return points;
  }

  onCreateNewGame(){

  }
}
