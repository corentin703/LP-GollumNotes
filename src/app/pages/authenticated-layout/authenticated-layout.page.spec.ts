import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthenticatedLayoutPage } from './authenticated-layout.page';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {storageMock} from '@/__mocks__/capacitor/storageMock';
import {Storage} from '@ionic/storage';
import {ConfigService} from '@app/services/config.service';
import {configServiceMock} from '@/__mocks__/services/config-service-mock';

describe('AuthenticatedLayoutPage', () => {
  let component: AuthenticatedLayoutPage;
  let fixture: ComponentFixture<AuthenticatedLayoutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicModule.forRoot(), RouterTestingModule.withRoutes([])],
      declarations: [AuthenticatedLayoutPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Storage, useValue: storageMock},
        {provide: ConfigService, useValue: configServiceMock},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
