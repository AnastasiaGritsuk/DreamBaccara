import {Deck} from "./deck.";
import {Dealer} from "./dealer";
import {Player} from "./player";

export class Game {
  id: number;
  player: Player;
  deck: Deck;
  bet: any;
  dealer: any;
  winBet: any;

  constructor(player: Player, bet: any){
    this.id = this.uniqueId();
    this.player = player;
    this.deck = new Deck();
    this.bet = bet;
    this.dealer = Dealer;
  }

  uniqueId() {
    let date = Date.now();
    let random = Math.random() * Math.random();

    return Math.floor(date * random);
  };

  updateBalance() {
    if (this.bet.isWin) {
      let sum = this.bet.multiplier * this.bet.betAmount;
      this.player.balance.increase(sum);
    } else {
      this.player.balance.decrease(this.bet.amount);
    }
  }

  processGame(){
    this.drawCard(this.player, 2);
    this.drawCard(this.dealer, 2);
    this.isThirdCardNeeded(this.player.cards, this.player.cards);
    this.checkWinBet(this.player.points, this.player.points);
    this.checkWinner();
    this.updateBalance();
  }

  drawCard(context, count) {
    let newCards = this.deck.getCard(count);
    context.cards = context.cards.concat(newCards);
    context.points = this.calcPoints(context.cards);
  }

  calcPoints(arr: any[]){
    return arr.map((obj)=>{
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    });
  }

  isThirdCardNeeded(playerPoints, dealerPoints) {
    if (playerPoints >= 0 && playerPoints <= 5)
      this.drawCard.call(this.player, 1);

    if (dealerPoints >= 0 && dealerPoints <= 4)
      this.drawCard.call(this.dealer, 1);

    if (dealerPoints == 5) {
      if (playerPoints >= 0 && playerPoints <= 5) {
        this.drawCard.call(this.dealer, 1);
      }
    }
  }

  checkWinner() {
    if(this.bet.value === this.winBet){
      this.bet.isWin = true;
    }
  }

  checkWinBet(playerPoints, dealerPoints) {
    if (playerPoints == dealerPoints) {
      this.winBet = 'tieBet';
    }
    if (playerPoints > dealerPoints) {
      this.winBet = 'playerBet';
    } else {
      this.winBet = 'bankBet';
    }
  }

  showResults(){
    return {

    }
  }
}
