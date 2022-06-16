import { TestBed } from '@angular/core/testing';

import { HttpDownloadService } from './http-download.service';

describe('DownloadService', () => {
  let service: HttpDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
