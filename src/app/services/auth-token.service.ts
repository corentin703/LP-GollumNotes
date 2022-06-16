import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {AuthenticationState} from './auth-token-service.type';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private readonly storageKey = 'authToken';

  constructor(private storageService: StorageService) {
    //
  }

  public get(): Observable<string | null> {
    const getToken = async (): Promise<string | null> =>
      await this.storageService.get(this.storageKey);

    return fromPromise(getToken());
  }

  public getAuthentificationState(): Observable<AuthenticationState> {
    return this.get().pipe(map(authToken =>
      authToken === null ? AuthenticationState.disconnected : AuthenticationState.connected
    ));
  }

  public async save(jwtToken: string): Promise<void> {
    await this.storageService.store(this.storageKey, jwtToken);
  }

  public async delete(): Promise<void> {
    await this.storageService.delete(this.storageKey);
  }
}
