import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {APICacheService} from "../services/api.cache";
import {CacheInterceptor} from './cache.interceptor';

describe('Cache Interceptor', () => {

  const itemData = {}

  const apiCacheStub = {
    isCachedValue: true,
    isCached() {
      return this.isCachedValue;
    },
    addItem() {},
    getItem() {
      return new Observable(observer => {
        observer.next(itemData);
        observer.complete();
      });
    }
  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
      {provide: APICacheService, useValue: apiCacheStub }]
  }));

  describe('intercept HTTP requests', () => {
    it('should add Accept-Language to Headers', inject([HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {

        http.get('/api').subscribe(response => expect(response).toBeTruthy());
        const request = mock.expectOne(req => (req.headers.has('Accept-Language') && req.headers.get('Accept-Language') === 'ar'));

        request.flush({data: 'test'});
        mock.verify();
      }));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
