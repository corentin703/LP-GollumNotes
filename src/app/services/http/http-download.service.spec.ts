import { TestBed } from '@angular/core/testing';

import { HttpDownloadService } from './http-download.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DownloadService', () => {
  let service: HttpDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();

    service = TestBed.inject(HttpDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
