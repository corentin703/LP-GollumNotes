import { TestBed } from '@angular/core/testing';

import { NoteHttpService } from './note-http.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NoteService', () => {
  let service: NoteHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();

    service = TestBed.inject(NoteHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
