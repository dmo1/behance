import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {CreativeFields} from '../models/creative.fields';
import {config} from '../config/config';

@Injectable()
export class RestService {
  private PROXY_PATH = 'http://localhost:3000/';
  private API_PATH = `${this.PROXY_PATH}https://api.behance.net/v2/`;
  private FIELDS_PATH = `${this.API_PATH}fields?client_id=${config.clientId}`;
  private PROJECTS_PATH = `${this.API_PATH}projects?client_id=${config.clientId}`;

  constructor(
    private http: HttpClient
  ) {}

  getAPIResource(url: string): Observable<any> {
      return this.http.get(url);
  }

  getCreativeFields(): Observable<any> {
    return this.getAPIResource(this.FIELDS_PATH);
  }

  getProjects(queryTitle: string): Observable<any> {
    return this.getAPIResource(`${this.PROJECTS_PATH}&q=${queryTitle}`);
  }
}
