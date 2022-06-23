import { TestBed } from '@angular/core/testing';

import { PictureStoreService } from './picture-store.service';

describe('PictureStoreService', () => {
  let service: PictureStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
