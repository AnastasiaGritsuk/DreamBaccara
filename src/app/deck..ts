function card(value, name, suit){
  this.value = value;
  this.name = name;
  this.suit = suit;
}

function createDeck(){
  var names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var suits = ['Hearts','Diamonds','Spades','Clubs'];
  var cards = [];

  for( var s = 0; s < suits.length; s++ ) {
    for( var n = 0; n < names.length; n++ ) {
      cards.push( new card( toValue(n+1), names[n], suits[s] ) );
    }
  }

  return cards;
}

function toValue(n){
  if(n>9) n=0;
    return n;
}

export class Deck  {
  cards:any[] = [];

  create() {
    this.cards = createDeck();
  }

  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }

    console.log(this.cards);
  }

  getCard(count:number) {
    let result:number[] =[];

    for(var i=0;i<count;i++) {
      result.push(this.cards.shift());
    }
    return result;
  }
}

