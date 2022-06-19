import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotesPage } from './notes.page';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Storage} from '@ionic/storage';
import {storageMock} from '@/__mocks__/capacitor/storageMock';

describe('NotesPage', () => {
  let component: NotesPage;
  let fixture: ComponentFixture<NotesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesPage ],
      imports: [IonicModule, HttpClientTestingModule],
      providers: [
        {provide: Storage, useValue: storageMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
