export enum BetType {
  Player,
  Bank,
  Tie
};

const Bets = {
  [BetType.Player]:{
    multiplier: 1
  },
  [BetType.Bank]:{
    multiplier: 0.95
  },
  [BetType.Tie]:{
    multiplier: 0.9
  }
};

export const BankMoney = 10000;
export const DefaultBetType = BetType.Bank;
export const DefaultBetValue = 10;


export class Game {
  gameHistory: any;
  data;
  dealer: Dealer;
  player: Player;

  constructor(public dealerWallet: Wallet, public playerWallet: Wallet) {
    this.dealer = new Dealer(dealerWallet);
    this.player = new Player(playerWallet);
  }

  processGame(data) {
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

  calcPoints(arr: any[]) {
    return arr.map((obj) => {
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return (previousValue + currentValue) % 10;
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
    if (this.data.bet.value === this.data.winBet) {
      this.data.bet.isWin = true;
      this.data.text = 'Player won';
    } else {
      this.data.text = 'Dealer won';
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
      let sum = this.data.bet.multiplier * this.data.bet.amount;
      this.data.player.balance.increase(sum);
    } else {
      this.data.player.balance.decrease(this.data.bet.amount);
    }
  }

  addToHistory(game) {
    this.gameHistory.push(game);
  }
}

export class Bet {
  constructor(public type: BetType, public value: number){}
}

export  class Wallet {
  constructor(public money: number, public name: string){}

  get(){
    return this.money;
  }

  set(money: number) {
    this.money =+ money;
  }
}

export class Table {
  dealer = new Wallet(BankMoney, 'Dealer');

  newGame(player: Wallet):Game{
    return new Game(this.dealer, player);
  }
}

export class Player {
  cards: Card[];
  constructor(public wallet: Wallet){}

  makeBet(bet: Bet){

  }
}

export interface Card{
  value:number,
  name:string,
  suit:string
}

export class Dealer{
  cards:Card[];

  constructor(public waller: Wallet){}

  finishGame(){}
}
