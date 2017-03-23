import {Injectable} from "@angular/core";
import {Balance} from "./balance";
import {Bet} from "./bet";

@Injectable()
export class Player  {
  name: string;
  points: number;
  history: Object;
  purse: Balance;
  bet:Bet;

  constructor(name:string,points:number,purse:Balance,bet:Bet) {
    this.name = name;
    this.points = points;
    this.purse = purse;
    this.bet = bet;
  }
}
