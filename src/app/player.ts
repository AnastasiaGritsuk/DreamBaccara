import {Injectable} from "@angular/core";
import {Balance} from "./balance";
import {Bet} from "./bet";

@Injectable()
export class Player  {
  name: string;
  points: number;
  balance: Balance;
  bet:Bet;

  constructor(name:string,balance:number,bet:Bet) {
    this.name = name;
    this.points = 0;
    this.balance = new Balance(balance);
    this.bet = bet;
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
}
