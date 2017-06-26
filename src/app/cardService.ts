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

}
