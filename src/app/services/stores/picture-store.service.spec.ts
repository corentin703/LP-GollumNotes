import { TestBed } from '@angular/core/testing';

import { PictureStoreService } from './picture-store.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PictureStoreService', () => {
  let service: PictureStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PictureStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
