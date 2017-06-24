import {Injectable} from "@angular/core";
import {Balance} from "./balance";
import {Bet} from "./bet";

@Injectable()
export class Player  {
  name: string;
  points: number;
  balance: Balance;
  bet:any;
  cards:number[];

  constructor(name:string,balance:number,bet:any) {
    this.name = name;
    this.points = 0;
    this.balance = new Balance(balance);
    this.bet = bet;
    this.cards = [];
  }

  setPoints(points:number) {
    this.points = this.points + points;
  }

  getPoints() {
    return this.points;
  }

  getBet() {
    return this.bet;
  }

  updateBalance(){
    if(this.bet.isWin) {
      let sum = this.bet.getWinBet();
      this.balance.increase(sum);
    } else {
      this.balance.decrease(this.bet.amount);
    }
  }

  getBalance() {
    return this.balance.getBalance();
  }

  receiveCards(newCards:number[]) {
    this.cards = this.cards.concat(newCards);
    this.calculatePoints();
  }

  calculatePoints() {
    this.points = this.cards.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    if(this.points == 10) {
      return 0;
    }

    if(this.points > 10) {
      this.points = this.points - 10;

      if(this.points == 10) return 0;

      return this.points;
    }

    return this.points;
  }
}
