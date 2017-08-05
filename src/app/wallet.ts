export  class Wallet {
  constructor(public amount: number, public name: string){}

  withdraw(amount:number){
    this.amount -= amount;
  }

  add(amount: number) {
    this.amount =+ amount;
  }
}
