import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthenticatedLayoutPage } from './authenticated-layout.page';
import {AppComponent} from '@app/app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthenticatedLayoutPage', () => {
  let component: AuthenticatedLayoutPage;
  let fixture: ComponentFixture<AuthenticatedLayoutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticatedLayoutPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ IonicModule.forRoot(), RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
