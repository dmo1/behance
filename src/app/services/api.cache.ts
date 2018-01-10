import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface CacheItem {
  expires: number,
  data: any
}

@Injectable()
export class APICacheService {
  static LOCAL_STORAGE_LITERAL = "APICacheService";
  cacheItems: Map<any, any>;

  constructor() {
    let localStorage = window.localStorage.getItem(APICacheService.LOCAL_STORAGE_LITERAL);

    if (!localStorage) {
      this.cacheItems = new Map();
      this.updateStorage();
    } else {
      this.cacheItems = new Map(JSON.parse(localStorage));
    }
  }

  private updateStorage() {
    let wha = [...this.cacheItems];
    let cacheSerialized = JSON.stringify(wha);
    window.localStorage.setItem(APICacheService.LOCAL_STORAGE_LITERAL, cacheSerialized);
  }

  isCached(key: string): boolean {
    if (this.cacheItems.has(key)) {
      let cacheItem = this.cacheItems.get(key);

      if (cacheItem.expires > Date.now()) {
        return true;
      } else {
        this.cacheItems.delete(key);
        this.updateStorage();
        return false;
      }
    } else {
      return false;
    }
  }

  addItem(key: string, data: any): void {
    let cacheItem: CacheItem = {
      expires: Date.now() + 1000 * 60 * 60 * 24,
      data: data
    }
    this.cacheItems.set(key, cacheItem);
    this.updateStorage();
  }

  getItem(key: string): Observable<any> {
    return new Observable(observer => {
        const item = this.cacheItems.get(key);
        const itemData = item.data;

        observer.next(itemData);
        observer.complete();
    });
  }
}
