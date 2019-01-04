import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DecauxAPIService} from './decaux-api.service';
import {HttpClientModule} from '@angular/common/http';
import { StationComponent } from './station/station.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    MapComponent
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
