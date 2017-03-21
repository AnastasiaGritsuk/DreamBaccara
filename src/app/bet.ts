import {Injectable} from "@angular/core";

@Injectable()
export class Bet  {
  name:string;
  rate: number;

  constructor(name:string, rate:number) {
    this.name = name;
    this.rate = rate;
  }
}

