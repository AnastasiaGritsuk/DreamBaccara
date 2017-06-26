import {Component} from '@angular/core';
import {Deck} from './deck.'
import {Balance} from "./balance";
import {Bets} from "./bets";
import {Player} from "./player";
import {CardService} from "./cardService";
import {GameSession} from "./gameSession";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  public betAmount = 10;
  cardDeck = new Deck();
  bets = new Bets().getBets();
  selectedBet: any = null;
  gameSession: GameSession;

  gamesHistory = {};

  dealer = {
    name: 'Dialer',
    points: 0,
    balance: new Balance(200),
    cards: []
  };

  player = new Player('Nastya', 2000);

  winnerPlayerText = '';
  winnerBetText = '';

  constructor(public cardService: CardService) {};

  onStartClick() {

    this.selectedBet.amount = this.betAmount;
    this.gameSession = new GameSession(this.player, this.selectedBet, this.cardDeck);
    this.gamesHistory[this.player.id] = this.gameSession;

    //this.player.bet = this.selectedBet;
    console.log('i am running');

    this.updateCards(this.gameSession, 2);
    this.gameSession.points = this.cardService.calculatePoints(this.gameSession.cards);

    this.updateCards(this.dealer, 2);
    this.dealer.points = this.cardService.calculatePoints(this.gameSession.cards);

    let toThirdCard = this.cardService.isThirdCardNeeded(this.gameSession.points, this.dealer.points);

    if(toThirdCard === 'player') {
      this.updateCards(this.gameSession, 1);
      this.gameSession.points = this.cardService.calculatePoints(this.gameSession.cards);
    }

    if(toThirdCard === 'dealer') {
      this.updateCards(this.dealer, 1);
      this.dealer.points = this.cardService.calculatePoints(this.gameSession.cards);
    }

    let betWinner: string = this.checkWinner();
    this.checkBet(betWinner);
    this.updateBalance();
  }

  updateCards(player, cardsCount){
    let newCards = this.cardDeck.getCard(cardsCount);
    player.cards = player.cards.concat(newCards);
  }

  checkWinner() {
    let pPoints = this.gameSession.points;// it is like a gamesession method
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
    if (this.gameSession.bet.value == betWinner) {
      this.gameSession.bet.isWin = true;
      this.winnerBetText = 'Player bet won';
    } else {
      this.winnerBetText = 'Player bet lost';
    }
  }

  updateBalance() {
    if (this.gameSession.bet.isWin) {
      let sum = this.selectedBet.multiplier * this.betAmount;
      this.gameSession.player.balance.increase(sum);
    } else {
      this.gameSession.player.balance.decrease(this.gameSession.bet.amount);
    }
  }
}
