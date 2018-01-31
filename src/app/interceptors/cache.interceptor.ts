import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import {APICacheService} from "../services/api.cache";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cache: APICacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(req);

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    if (this.cache.isCached(req.url)) {
      console.log("is cached");
      return this.cache.getItem(req.url);
    } else {
      console.log("not cached");
      return next.handle(req)
        .do(event => {
          if (event instanceof HttpResponse) {
            this.cache.addItem(req.url, req.body);
          }
        });
    }
  }
}
