import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {FormsModule} from "@angular/forms";
import {CardService} from "./cardService";

@NgModule({
  imports:      [ BrowserModule, FormsModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ CardService ]
})
export class AppModule { }
