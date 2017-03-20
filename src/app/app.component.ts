import { Component } from '@angular/core';
import { CardDesk } from './cardDesk.component'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html',
  providers: [CardDesk]
})
export class AppComponent  {
  constructor(public cardDeskComponent:CardDesk) {};
}
