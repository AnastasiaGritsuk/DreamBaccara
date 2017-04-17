import {Injectable} from "@angular/core";

@Injectable()
export class Bet  {
  name:string;
  factor: number;
  amount: number;
  isWin = false;

  constructor(name:string, amount:number) {
    this.name = name;
    this.amount = amount;

    switch(name) {
      case 'playerBet' : this.factor = 1;
        break;
      case 'bankBet' : this.factor = 0.95;
        break;
      case 'tieBet' : this.factor = 0.9;
        break;
      default : this.factor = 1;
        break;
    }
  }

  getWinBet() {
    return this.factor * this.amount;
  }
}

