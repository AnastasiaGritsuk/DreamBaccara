export class Bets  {
  private arr = [
    {
      name: 'Player',
      value: 'playerBet',
      multiplier: 1,
      isWin: false,
      amount: 0
    }, {
      name: 'Bank',
      value: 'bankBet',
      multiplier: 0.95,
      isWin: false,
      amount: 0
    }, {
      name: 'Tie',
      value: 'tieBet',
      multiplier: 0.9,
      isWin: false,
      amount: 0
    }
  ];

  getBets() {
    return this.arr;
  }
}

