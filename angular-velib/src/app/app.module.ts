import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DecauxAPIService} from './decaux-api.service';
import {HttpClientModule} from '@angular/common/http';
import { StationComponent } from './station/station.component';

@NgModule({
  declarations: [
    AppComponent,
    StationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DecauxAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
