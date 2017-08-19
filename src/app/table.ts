import {BankMoney, Game, PlayerMoney} from "./game";
import {Money} from "./money";
import {BetType} from "./game";
import {History} from "./history";

export class Table {
  dealerMoney = new Money(BankMoney);
  playerMoney = new Money(PlayerMoney);
  history = new History();

  constructor(){}

  isBetValid(type:BetType, value:number) {
    return true;
  }

  bet(type:BetType, value:number){
    let game = new Game(type, value);
    let result = game.play();

    this.dealerMoney.add(result.dealer);
    this.playerMoney.add(result.player);

    this.history.save(game);
  }

}
