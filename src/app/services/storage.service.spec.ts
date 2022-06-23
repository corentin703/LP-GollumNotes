import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {Storage} from '@ionic/storage';
import {storageMock} from '@/__mocks__/capacitor/storageMock';
import {faker} from '@faker-js/faker';

describe('ImageStorageService', () => {
  let storageService: StorageService;

  const key = 'test';
  const toStore = faker.lorem.text();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Storage, useValue: storageMock},
      ]
    });
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should save value', () => {
    storageService.store(key, toStore).then(_ => {
      let storedValue: string;
      storageMock.get(key).then(value => {
        storedValue = value;
        expect(storedValue).toEqual(toStore);
      });
    });
  });

  it ('should read value', () => {
    storageMock.set(key, toStore).then(_ => {
      storageService.get(key).then(value => {
        expect(value).toEqual(toStore);
      });
    });
  });

  it ('should delete value', () => {
    storageMock.set(key, toStore).then(_ => {
      storageService.delete(key).then(__ => {
        storageMock.get(key).then(value => {
          expect(value).toEqual(undefined);
        });
      });
    });
  });
});
