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

  winnerText = '';

  constructor() {}

  onStartClick() {
    this.selectedBet.amount = this.betAmount;
    this.player['bet'] = this.selectedBet;
    console.log('i am running');

    this.cardDeck = new Deck();
    this.cardDeck.shuffle();

    //for player
    let newCards = this.getCardsFromCardDesk(2);
    this.player.cards = this.player.cards.concat(newCards);
    this.player.points = this.calculatePoints(this.player.cards);

    //for dialer
    let newCardsDealer = this.getCardsFromCardDesk(2);
    this.dealer.cards = this.dealer.cards.concat(newCardsDealer);
    this.dealer.points = this.calculatePoints(this.dealer.cards);

    this.isThirdCardNeeded(this.player.points, this.dealer.points);

    let betWinner: string = this.checkWinner();
    this.checkBet(betWinner);
    this.updateBalance();
  }

  checkWinner() {
    let pPoints = this.player.points;
    let dPoints = this.dealer.points;

    console.log('checkWinner: pPoints ' + pPoints);
    console.log('checkWinner: dPoints ' + dPoints);

    if (pPoints == dPoints) {
      console.log('Tie')
      return 'tieBet';
    }
    if (pPoints > dPoints) {
      console.log('Player won');
      return 'playerBet';
    } else {
      console.log('Dealer won');
      return 'bankBet';
    }
  }

  checkBet(betWinner: string) {
    if (this.player.bet.value == betWinner) {
      this.player.bet.isWin = true;
      this.winnerText = 'Player bet won';
    } else {
      this.winnerText = 'Dealer bet won';
    }
  }

  isThirdCardNeeded(playerPoints: number, dealerPoints: number) {
    if (playerPoints >= 0 && playerPoints <= 5) {

      let newCards = this.getCardsFromCardDesk(1);
      this.player.cards = this.player.cards.concat(newCards);
      this.player.points = this.calculatePoints(this.player.cards);
    }

    if (dealerPoints >= 0 && dealerPoints <= 4) {
      let newCardsDealer = this.getCardsFromCardDesk(1);
      this.dealer.cards = this.dealer.cards.concat(newCardsDealer);
      this.dealer.points = this.calculatePoints(this.dealer.cards);
    }

    if (dealerPoints == 5) {
      if (playerPoints >= 0 && playerPoints <= 5) {
        let newCardsDealer = this.getCardsFromCardDesk(1);
        this.dealer.cards = this.dealer.cards.concat(newCardsDealer);
        this.dealer.points = this.calculatePoints(this.dealer.cards);
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

  calculatePoints(arr: number[]) {
    let points = arr.reduce(function (previousValue, currentValue) {
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
}
