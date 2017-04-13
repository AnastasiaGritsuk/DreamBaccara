import {Injectable} from "@angular/core";
import {Balance} from "./balance";
import {Bet} from "./bet";

@Injectable()
export class Player  {
  name: string;
  points: number;
  purse: number;
  bet:Bet;

  constructor(name:string,purse:number) {
    this.name = name;
    this.points = 0;
    this.purse = purse;
  }

  setBet(bet:Bet){
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
}
