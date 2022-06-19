import { TestBed } from '@angular/core/testing';

import { NoteStoreService } from './note-store.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NoteStoreService', () => {
  let service: NoteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(NoteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
