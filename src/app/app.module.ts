import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RestService } from './services/rest';
import { APICacheService } from './services/api.cache';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    RestService,
    APICacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
