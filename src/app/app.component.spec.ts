import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RestService} from './services/rest';

describe('AppComponent', () => {
  const itemData = { fields: [
    { id: 1, name: "Field 1"},
    { id: 2, name: "Field 2"}
  ]};

  const restServiceStub = {
    getCreativeFields(): Observable<any> {
      return new Observable(observer => {
        observer.next(itemData);
        observer.complete();
      });
    }
  };

  let restService, fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ {provide: RestService, useValue: restServiceStub } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    restService = fixture.debugElement.injector.get(RestService);
  });

  it('should render creative fields list', async(() => {
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(itemData.fields.length, ' fields number not correct.');

    let titleList = fixture.debugElement.queryAll(By.css('h2'));
    let secondTitle = titleList[1];
    expect(secondTitle.nativeElement.textContent).toEqual(itemData.fields[1].name, ' field values are not correct.');
  }));

});
