import { TestBed } from '@angular/core/testing';

import { PictureStoreService } from './picture-store.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PictureStoreService', () => {
  let pictureStoreService: PictureStoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    pictureStoreService = TestBed.inject(PictureStoreService);
  });

  it('should be created', () => {
    expect(pictureStoreService).toBeTruthy();
  });

});
