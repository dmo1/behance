import { Component } from '@angular/core';

import { RestService } from './services/rest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Behance';

  constructor(private rest: RestService){}

  ngOnInit(): void {
    this.rest
      .getCreativeFields()
      .subscribe(data => {
        console.log(data);
      });
  }

}
