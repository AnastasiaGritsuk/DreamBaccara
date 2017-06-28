export class Game {
  gameHistory: any;
  data;
  constructor(){}

  processGame(data){
    this.data = data;

    this.drawCard('player', 2);
    this.drawCard('dealer', 2);
    this.isThirdCardNeeded();
    this.checkWinBet();
    this.checkWinner();
    this.updateBalance();

    return this.data;
  }


  drawCard(context, count) {
    let newCards = this.data.deck.getCard(count);
    this.data[context].cards = this.data[context].cards.concat(newCards);
    this.data[context].points = this.calcPoints(this.data[context].cards);
  }

  calcPoints(arr: any[]){
    return arr.map((obj)=>{
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return (previousValue + currentValue)%10;
    });
  }

  isThirdCardNeeded() {
    let playerPoints = this.data.player.points;
    let dealerPoints = this.data.dealer.points;

    if (playerPoints >= 0 && playerPoints <= 5) {
      this.drawCard('player', 1);
    }
    if (dealerPoints >= 0 && dealerPoints <= 4) {
      this.drawCard('dealer', 1);
    }
    if (dealerPoints == 5) {
      if (playerPoints >= 0 && playerPoints <= 5) {
        this.drawCard('dealer', 1);
      }
    }
  }

  checkWinner() {
    if(this.data.bet.value === this.data.winBet){
      this.data.bet.isWin = true;
      console.log('Player won');
    } else {
      console.log('Dealer won');
    }
  }

  checkWinBet() {
    if (this.data.player.points == this.data.dealer.points) {
      this.data.winBet = 'tieBet';
    }
    if (this.data.player.points > this.data.dealer.points) {
      this.data.winBet = 'playerBet';
    } else {
      this.data.winBet = 'bankBet';
    }
  }

  updateBalance() {
    if (this.data.bet.isWin) {
      let sum = this.data.bet.multiplier * this.data.bet.betAmount;
      this.data.player.balance.increase(sum);
    } else {
      this.data.player.balance.decrease(this.data.bet.amount);
    }
  }

  addToHistory(game){
    this.gameHistory.push(game);
  }
}
