export const Names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
export const Suits = ['H','D','S','C'];

export class Card {
  constructor(private name: string,
              private suit: string){
  }

  get value(){
    if(this.name > '9')
      return 0;

    return Number(this.name);
  }

  toString(){
    return this.name + this.suit;
  }
}
