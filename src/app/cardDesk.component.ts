import { Component } from '@angular/core';

@Component({

})
export class cardDeskComponent  {
  cards:number[] = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1];
  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }
  getCard(count:number) {
    return this.cards.shift();
  }
}

