import {Injectable} from "@angular/core";
import {Balance} from "./balance";
import {Bet} from "./bet";

@Injectable()
export class Player  {
  name: string;
  points: number;
  purse: number;
  bet:string;

  constructor(name:string,purse:number) {
    this.name = name;
    this.points = 0;
    this.purse = purse;
  }

  setBet(betName:string){
    this.bet = betName;
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
