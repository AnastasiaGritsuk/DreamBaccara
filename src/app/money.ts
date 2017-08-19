export  class Money {
  constructor(public amount: number){}

  add(amount: number) {
    this.amount += amount;
  }
}
