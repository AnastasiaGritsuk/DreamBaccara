import {Injectable} from "@angular/core";

@Injectable()
export class Balance  {
  private amount: number;

  constructor(balance:number) {
    this.amount = balance;
  }

  increase(amount:number) {
    this.amount = this.amount + amount;
  }

  decrease(amount:number) {
    this.amount = this.amount - amount;
  }

  getBalance(){
    return this.amount;
  }
}
