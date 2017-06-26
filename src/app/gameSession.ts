import {Deck} from "./deck.";
import {Card} from "./card";
import {Player} from "./player";

export class GameSession  {
  id: number;
  player: Player;
  cards: Card[];
  points: number;
  deck: Deck;
  bet: any;

  constructor(player: Player, bet: any, deck: Deck){
    this.id = this.uniqueId();
    this.player = player;
    this.cards = [];
    this.points = 0;
    this.deck = deck;
    this.bet = bet;
  }

  uniqueId() {
    let date = Date.now();
    let random = Math.random() * Math.random();

    return Math.floor(date * random);
  };
}
