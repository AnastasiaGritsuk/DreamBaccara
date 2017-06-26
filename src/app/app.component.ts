import {Component} from '@angular/core';
import {Deck} from './deck.'
import {Balance} from "./balance";
import {Bets} from "./bets";
import {Player} from "./player";
import {CardService} from "./cardService";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  public betAmount = 10;
  cardDeck: Deck;
  bets = new Bets().getBets();
  selectedBet: any = null;

  dealer = {
    name: 'Dialer',
    points: 0,
    balance: new Balance(200),
    cards: []
  };

  player1 = new Player('Nastya', 2000);

  player = {
    name: 'Demo',
    points: 0,
    balance: new Balance(200),
    cards: [],
    bet: null
  };

  winnerPlayerText = '';
  winnerBetText = '';

  constructor(public cardService: CardService) {};

  onStartClick() {
    this.selectedBet.amount = this.betAmount;
    this.player.bet = this.selectedBet;
    console.log('i am running');

    this.cardDeck = new Deck();

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
    player.points = this.cardService.calculatePoints(player.cards);// it is not update cards
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
}
