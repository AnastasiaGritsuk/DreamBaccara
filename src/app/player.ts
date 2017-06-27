import {Balance} from "./balance";

export class Player {
  id: number;
  name: string;
  balance: Balance;
  points:number;
  cards: any;

  constructor(name:string,balance:number) {
    this.id = this.uniqueId();
    this.name = name;
    this.balance = new Balance(balance);
    this.points = 0;
    this.cards = [];
  }

  uniqueId() {
    let date = Date.now();
    let random = Math.random() * Math.random();

    return Math.floor(date * random);
  };

}
