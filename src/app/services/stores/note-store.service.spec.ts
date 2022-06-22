import { TestBed } from '@angular/core/testing';

import { NoteStoreService } from './note-store.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Note} from '@app/entities/Note';
import {fakeConfig} from '@/__mocks__/services/config-service-mock';

describe('NoteStoreService', () => {
  let noteStoreService: NoteStoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    noteStoreService = TestBed.inject(NoteStoreService);
  });

  it('should be created', () => {
    expect(noteStoreService).toBeTruthy();
  });

  // it('should get all', () => {
  //   let gotNotes: Note[];
  //   noteStoreService.getAll().subscribe(notes => gotNotes = notes);
  //   httpTestingController.expectOne(`${fakeConfig.webService.url}/notes`);
  //
  // });

});
