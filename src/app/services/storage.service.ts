import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // private storage: Storage | null = null;

  private readonly initializeState: Promise<Storage>;

  constructor(
    private storage: Storage
  ) {
    this.initializeState = storage.create().then();
    // this.init().then(r => console.log('Storage initialized'));
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

  // private async init() {
  //   this.storage = await this.service.create();
  // }

}
