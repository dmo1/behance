import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';

import { RestService } from './services/rest';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { APICacheService } from './services/api.cache';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ [{
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }],
    RestService,
    APICacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
