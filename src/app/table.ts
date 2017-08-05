import {BankMoney, Dealer, Game, Player, PlayerMoney} from "./game";
import {Wallet} from "./wallet";

export class Table {
  dealer: Dealer;
  bankMoney: Wallet;

  constructor(){
    this.bankMoney = new Wallet(BankMoney, 'Dealer');
    this.dealer = new Dealer(this.bankMoney);
  }

  newGame(player: Player):Game{
    return new Game(this.dealer, player);
  }

  newPlayer(){
    return new Player(new Wallet(PlayerMoney, 'Player'));
  }
}
