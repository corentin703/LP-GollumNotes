import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly initializeState: Promise<Storage>;

  constructor(
    private storage: Storage
  ) {
    this.initializeState = storage.create().then();
  }

  async delete(key: string): Promise<void> {
    await this.initializeState;
    return await this.storage.remove(key);
  }

  async get(key: string): Promise<string | null> {
    await this.initializeState;
    return this.storage.get(key);
  }

  async store(key: string, data: string): Promise<void> {
    await this.initializeState;
    await this.storage.set(key, data);
  }
}
