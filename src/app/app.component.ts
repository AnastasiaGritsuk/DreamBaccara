import { Component } from '@angular/core';
import {CardDesk} from './cardDesk.'
import {Balance} from "./balance";
import {Bet} from "./bet";
import {Game} from "./game";
import {Player} from "./player";
import {Dealer} from "./dealer";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [CardDesk, Balance, Bet]
})
export class AppComponent {
  game:Game;
  player:Player;
  bet:Bet;
  cardDesk:CardDesk;
  dealer:Player;

  constructor(game:Game,player:Player,cardDesk:CardDesk) {
    this.game = game;
    this.player = player;
    this.cardDesk = cardDesk;
    this.dealer = new Player('Dealer', 1000000);
  }

  run(bet:Bet) {
    console.log('i am running');
    this.player.setBet(bet);
    this.cardDesk.shuffle();

    let pointsPlayer = this.cardDesk.getCard(2).reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    this.player.setPoints(pointsPlayer);

    let pointsDealer = this.cardDesk.getCard(2).reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });

    this.dealer.setPoints(pointsDealer);
    this.checkWinner();
  }

  checkWinner(){
    let pPoints = this.player.getPoints();
    let dPoints = this.dealer.getPoints();

    if(pPoints == dPoints) {
      console.log('Tie')
    }
    if(pPoints>dPoints) {
      console.log('Player won');
    }else {
      console.log('Dealer won');
    }
  }


  /*list of events
  * user presses 'Start game' -> run on DocumentView, player with preconditions
  * bet
  * */
}
