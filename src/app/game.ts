import {Deck} from "./deck.";
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

enum StateType {
  Ready,
  Bet,
  Shuffle,
  Dealt1,
  Dealt2,
  DealtDealer,
  Result
}


export class Game {
  data;
  dealer: Dealer;
  player: Player;
  deck: Deck;

  constructor(public dealerWallet: Wallet, public playerWallet: Wallet) {
    this.dealer = new Dealer(dealerWallet);
    this.player = new Player(playerWallet);
    this.deck = new Deck();
  }

  makeBet(bet: Bet){
    this.player.makeBet(bet);
  }

  shuffle(){
    this.deck.shuffle();
  }

  dealt1(){
    this.player.takeCard(this.deck.takeOne(), 2);
    this.dealer.takeCard(this.deck.takeOne(), 2);
  }

  dealt2(){
    let points = this.player.calculate();
    if(points >= 0 && points <= 5) {
      this.player.takeCard(this.deck.takeOne(), 1);
    }
    if (points == 5) {
      if (this.player.points >= 0 && this.player.points <= 5) {
        this.player.takeCard(this.deck.takeOne(), 1);
      }
    }
  }

  dealtDealer(){
    let points = this.dealer.calculate();
    if(points >= 0 && points <= 4) {
      this.dealer.takeCard(this.deck.takeOne(), 1);
    }
  }

  finishGame(){
    this.dealer.finishGame(this.player);
  }
}

export class Bet {
  constructor(public type: BetType, public value: number){}
}

export  class Wallet {
  constructor(public money: number, public name: string){}

  withdraw(money:number){
    this.money -= money;
  }

  add(money: number) {
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
  bet;
  points: number;

  constructor(public wallet: Wallet){}

  makeBet(bet: Bet){
    this.bet = bet;
  }

  takeCard(card: Card, count:number){
    for(let i=0;i<=count;i++){
      this.cards.push(card);
    }
  }

  calculate(){
    return this.cards.map((obj) => {
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return (previousValue + currentValue) % 10;
    });
  }
}

export interface Card{
  value:number,
  name:string,
  suit:string
}

export class Dealer{
  cards:Card[];
  points: number;

  constructor(public wallet: Wallet){}

  takeCard(card: Card, count:number){
    for(let i=0;i<=count;i++){
      this.cards.push(card);
    }
  }

  calculate(){
    return this.cards.map((obj) => {
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return (previousValue + currentValue) % 10;
    });
  }

  finishGame(player: Player){
    if(player.points > this.points){
      if(player.bet.type === BetType.Player) {
        this.wallet.withdraw(player.bet.value*Bets[BetType.Player].multiplier);
        player.wallet.add(player.bet.value + player.bet.value*Bets[BetType.Player].multiplier);
      }
    }
    if(player.points === this.points){
      if(player.bet.type === BetType.Tie) {
        this.wallet.withdraw(player.bet.value*Bets[BetType.Tie].multiplier);
        player.wallet.add(player.bet.value + player.bet.value*Bets[BetType.Tie].multiplier);
      }
    }
    if(player.points < this.points){
      if(player.bet.type === BetType.Bank) {
        player.wallet.withdraw(player.bet.value*Bets[BetType.Bank].multiplier);
        this.wallet.add(player.bet.value + player.bet.value*Bets[BetType.Bank].multiplier);
      }
    }
  }
}
