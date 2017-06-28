import {Card} from "./card";

export class Deck  {
  cards:any[] = [];

  constructor() {
    this.createDeck();
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }

  createDeck(){
    let names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let suits = ['H','D','S','C'];

    for( let s = 0; s < suits.length; s++ ) {
      for( let n = 0; n < names.length; n++ ) {
        this.cards.push( new Card( this.toValue(n+1), names[n], suits[s] ) );
      }
    }
  }

  toValue(n){
    if(n>9) n=0;
    return n;
  }

  getCard(count:number) {
    let result:number[] =[];

    for(var i=0;i<count;i++) {
      result.push(this.cards.shift());
    }
    return result;
  }
}
