import {Game} from "./game";

export class History {
  games: Game[] = [];

  last():Game {
    return this.games.slice(-1)[0];
  }

  save(game):void {
    this.games.push(game);
  }


}
