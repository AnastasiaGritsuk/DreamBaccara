import {Card, Names, Suits} from "./card";



export class Deck  {
  cards:Card[] = [];

  constructor() {
    this.create();
  }

  shuffle():void {
    let l = this.cards.length;
    let temp: Card;

    for (let i = 100; i; i--) {
      let j = Math.floor(Math.random() * l);
      let k = Math.floor(Math.random() * l);

      temp = this.cards[k];
      this.cards[j] = this.cards[k];
      this.cards[k] = temp;
    }
  }

  create(){
    for( let s of Suits) {
      for(let n of Names ) {
        this.cards.push( new Card( n, s ) );
      }
    }
  }

  one():Card {
    return this.cards.shift();
  }
}
