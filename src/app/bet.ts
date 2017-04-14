import {Injectable} from "@angular/core";

@Injectable()
export class Bet  {
  name:string;
  factor: number;

  constructor(name:string) {
    this.name = name;

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
}

