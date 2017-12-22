import { Component } from '@angular/core';

import { RestService } from './services/rest';
import {CreativeFields} from './models/creative.fields';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:String = 'Behance';

  creativeFields: CreativeFields[];

  constructor(private rest: RestService){}

  ngOnInit(): void {
    this.rest
      .getCreativeFields()
      .subscribe(data => {
        if (data) {
          this.creativeFields = data.fields;
        }
      });
  }

}
