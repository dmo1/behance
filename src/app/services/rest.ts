import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {CreativeFields} from '../models/creative.fields';

@Injectable()
export class RestService {
  private PROXY_PATH = 'http://localhost:3000/';
  private CLIENT_ID = '3k45rP0JSROMVhZRI4wmTxfKU3Nwg1qV';
  private API_PATH = `${this.PROXY_PATH}https://api.behance.net/v2/`;
  private FIELDS_PATH = `${this.API_PATH}fields?client_id=${this.CLIENT_ID}`;
  private PROJECTS_PATH = `${this.API_PATH}projects?client_id=${this.CLIENT_ID}`;

  constructor(private http: HttpClient) {}

  getCreativeFields(): Observable<CreativeFields[]> {
    return this.http.get(this.FIELDS_PATH);
  }

  getProjects(queryTitle: string): Observable<any> {
    return this.http.get(`${this.PROJECTS_PATH}&q=${queryTitle}`);
  }
}
