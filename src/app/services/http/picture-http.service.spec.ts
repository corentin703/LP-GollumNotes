import { TestBed } from '@angular/core/testing';

import { PictureHttpService } from './picture-http.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PictureService', () => {
  let service: PictureHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PictureHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
