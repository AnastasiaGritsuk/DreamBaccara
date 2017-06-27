export class Game {
  gameHistory: any;
  currentGame;

  constructor(){}

  uniqueId() {
    let date = Date.now();
    let random = Math.random() * Math.random();

    return Math.floor(date * random);
  };

  updateBalance() {
    if (this.currentGame.bet.isWin) {
      let sum = this.currentGame.bet.multiplier * this.currentGame.bet.betAmount;
      this.currentGame.player.balance.increase(sum);
    } else {
      this.currentGame.player.balance.decrease(this.currentGame.bet.amount);
    }
  }

  processGame(){
    this.drawCard(this.currentGame.player, 2);
    this.drawCard(this.currentGame.dealer, 2);
    this.isThirdCardNeeded(this.currentGame.player.cards, this.currentGame.player.cards);
    this.checkWinBet(this.currentGame.player.points, this.currentGame.player.points);
    this.checkWinner();
    this.updateBalance();
  }

  drawCard(context, count) {
    let newCards = this.currentGame.deck.getCard(count);
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
      this.drawCard.call(this.currentGame.player, 1);

    if (dealerPoints >= 0 && dealerPoints <= 4)
      this.drawCard.call(this.currentGame.dealer, 1);

    if (dealerPoints == 5) {
      if (playerPoints >= 0 && playerPoints <= 5) {
        this.drawCard.call(this.currentGame.dealer, 1);
      }
    }
  }

  checkWinner() {
    if(this.currentGame.bet.value === this.currentGame.winBet){
      this.currentGame.bet.isWin = true;
    }
  }

  checkWinBet(playerPoints, dealerPoints) {
    if (playerPoints == dealerPoints) {
      this.currentGame.winBet = 'tieBet';
    }
    if (playerPoints > dealerPoints) {
      this.currentGame.winBet = 'playerBet';
    } else {
      this.currentGame.winBet = 'bankBet';
    }
  }

  showResults(){
    return {

    }
  }
}
