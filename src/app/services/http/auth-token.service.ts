import { Injectable } from '@angular/core';
import {StorageService} from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private readonly storageKey = 'authToken';

  constructor(private storageService: StorageService) { }

  public async get(): Promise<string | null> {
    return await this.storageService.get(this.storageKey);
  }

  public async save(jwtToken: string): Promise<void> {
    await this.storageService.store(this.storageKey, jwtToken);
  }

  public async delete(): Promise<void> {
    await this.storageService.delete(this.storageKey);
  }
}
