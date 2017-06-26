export class CardService  {

  calculatePoints(arr: any[]) {
    let points = arr.map((obj)=>{
      return obj.value;
    }).reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    });

    if (points == 10) {
      return 0;
    }

    if (points > 10) {
      points = points - 10;

      if (points == 10) return 0;

      return points;
    }

    return points;
  }

  isThirdCardNeeded(playerPoints: number, dealerPoints: number) {
    if (playerPoints >= 0 && playerPoints <= 5)
      return 'player';

    if (dealerPoints >= 0 && dealerPoints <= 4)
      return 'dealer';

    if (dealerPoints == 5) {
      if (playerPoints >= 0 && playerPoints <= 5) {
        //this.updateCards(this.dealer, 1);
        return 'dealer';
      }
    }
    return '';
  }
}
