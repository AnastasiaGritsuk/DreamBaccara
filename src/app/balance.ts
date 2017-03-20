import {Injectable} from "@angular/core";

@Injectable()
export class Balance  {
  balance: number;

  constructor(balance:number) {
    this.balance = balance;
  }

  increase(amount:number) {
    this.balance = this.balance + amount;
  }

  decrease(amount:number) {
    this.balance = this.balance - amount;
  }
}
