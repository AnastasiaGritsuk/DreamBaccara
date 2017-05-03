import {Injectable} from "@angular/core";
import {Player} from "./player";
import {Deck} from "./deck.";

@Injectable()
export class Game  {
  player:Player;
  cards:Deck;

  constructor(player: Player,cards: Deck){
    this.player = player;
    this.cards = cards;
  }
}
