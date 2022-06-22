import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {Storage} from '@ionic/storage';
import {storageMock} from '@/__mocks__/capacitor/storageMock';

describe('ImageStorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Storage, useValue: storageMock},
      ]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
