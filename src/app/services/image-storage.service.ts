import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  private storage: Storage | null = null;

  constructor(
    private storageService: Storage
  ) {
    //
  }

  delete(key: string): void {
    return this.storage.removeItem(key);
  }

  get(key: string): string {
    return this.storage.getItem(key);
  }

  store(key: string, file: string): void {
    this.storage.setItem(key, file);
  }

  private async init() {
    this.storage = await this.storageService.create({
      name: 'images'
    });
  }
}
