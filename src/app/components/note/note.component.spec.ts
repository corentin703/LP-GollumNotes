import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteComponent } from './note.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {Note} from '@app/entities/Note';

describe('NoteComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, NoteComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <app-note [note]="note">
    </app-note>`
})
class TestHostComponent {
  note: Note = {
    id: '075be91c-efeb-11ec-8ea0-0242ac120002',
    content: 'Test',
    title: 'test',
    createdAt: new Date(),
    lastModifiedAt: undefined,
    pictures: [],
  };
}
