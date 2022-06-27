import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {Storage} from '@ionic/storage';
import {storageMock} from '@/__mocks__/capacitor/storageMock';
import {faker} from '@faker-js/faker';

describe('StorageService', () => {
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

  it('should save value', async () => {
    await storageService.store(key, toStore);
    const storedValue = await storageMock.get(key);
    expect(storedValue).toEqual(toStore);
  });

  it ('should read value', async () => {
    await storageMock.set(key, toStore);
    const storedValue = await storageService.get(key);
    expect(storedValue).toEqual(toStore);
  });

  it ('should delete value', async () => {
    await storageMock.set(key, toStore);
    await storageService.delete(key);
    const storedValue = await storageMock.get(key);
    expect(storedValue).toEqual(undefined);
  });
});
