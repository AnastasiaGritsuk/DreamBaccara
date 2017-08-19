import {Card} from "./card";

export class Hand {
  cards: Card[] = [];

  constructor() {
  }

  take(card: Card) {
    this.cards.push(card);
  }

  value() {
    return this.cards.map((obj) => {
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return (previousValue + currentValue) % 10;
    });
  }
}
