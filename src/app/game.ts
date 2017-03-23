import {Injectable} from "@angular/core";
import {Player} from "./player";
import {CardDesk} from "./cardDesk.";

@Injectable()
export class Game  {
  player:Player;
  cards:CardDesk;

  constructor(player: Player,cards: CardDesk){
    this.player = player;
    this.cards = cards;
  }
}
