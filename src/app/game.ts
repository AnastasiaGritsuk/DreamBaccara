import {Deck} from "./deck";
import {Hand} from "./hand";

export enum BetType {
  Player,
  Bank,
  Tie
}

export const BetPayments = {
  [BetType.Player]:{
    multiplier: 1
  },
  [BetType.Bank]:{
    multiplier: 0.95
  },
  [BetType.Tie]:{
    multiplier: 8
  }
};

export const BankMoney = 10000;
export const PlayerMoney = 500;
export const DefaultBetType = BetType.Bank;
export const DefaultBetValue = 10;


export class Game {
  deck: Deck= new Deck();
  player:Hand = new Hand();
  dealer:Hand = new Hand();

  constructor(public betType: BetType, public value: number) {

  }

  play() {
    this.deal();

    return this.result();
  }

  deal() {
    this.deck.shuffle();
    this.dealTwo();
    this.dealRest();
  }

  dealTwo() {
    this.player.take(this.deck.one());
    this.dealer.take(this.deck.one());
    this.player.take(this.deck.one());
    this.dealer.take(this.deck.one());
  }

  dealRest() {
    if(this.dealer.value() >= 8 || this.player.value() >= 8)
      return;

    if(this.player.value() > 5) {
      if(this.dealer.value() <= 5) {
        this.dealer.take(this.deck.one());
      }
      return;
    }

    let thirdCard = this.deck.one();

    this.player.take(thirdCard);

    switch (this.dealer.value()) {
      case 0:
      case 1:
      case 2:
        this.dealer.take(this.deck.one());
        break;
      case 3:
        if(
          thirdCard.value == 1
          || thirdCard.value == 2
          || thirdCard.value == 3
          || thirdCard.value == 4
          || thirdCard.value == 5
          || thirdCard.value == 6
          || thirdCard.value == 7
          || thirdCard.value == 9
          || thirdCard.value == 0) {
          this.dealer.take(this.deck.one());
        }
        break;
      case 4:
        if(thirdCard.value == 2
          || thirdCard.value == 3
          || thirdCard.value == 4
          || thirdCard.value == 5
          || thirdCard.value == 6
          || thirdCard.value == 7) {
          this.dealer.take(this.deck.one());
        }
        break;
      case 5:
        if(thirdCard.value == 4
          || thirdCard.value == 5
          || thirdCard.value == 6
          || thirdCard.value == 7) {
          this.dealer.take(this.deck.one());
        }
        break;
      case 6:
        if(thirdCard.value == 6 || thirdCard.value == 7) {
            this.dealer.take(this.deck.one());
        }
        break
      case 7:
        break;
    }

  }

  result() {
    let payment:number;

    return {
      dealer:-payment,
      player:payment
    }
  }
}

