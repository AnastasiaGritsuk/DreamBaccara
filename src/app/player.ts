import {Injectable} from "@angular/core";
import {Balance} from "./balance";
import {Bet} from "./bet";

@Injectable()
export class Player  {
  name: string;
  points: number;
  purse: number;
  bet:Bet;

  constructor(name:string,purse:number,bet:Bet) {
    this.name = name;
    this.points = 0;
    this.purse = purse;
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
      this.purse = this.purse + sum;
    } else {
      this.purse = this.purse - this.bet.amount;
    }
  }
}
