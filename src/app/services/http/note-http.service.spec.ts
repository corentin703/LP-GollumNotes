import { TestBed } from '@angular/core/testing';

import { NoteHttpService } from './note-http.service';

describe('NoteService', () => {
  let service: NoteHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
