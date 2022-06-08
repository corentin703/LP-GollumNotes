import {Injectable} from '@angular/core';
import {StorageService} from '../storage.service';
import {AuthenticationState} from './auth-token-service.type';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private readonly storageKey = 'authToken';
  private currentJwtToken: string | undefined = undefined;

  private connectionState$: BehaviorSubject<AuthenticationState> = new BehaviorSubject<AuthenticationState>(undefined);

  constructor(private storageService: StorageService) {
    this.actualizeConnexionState();
  }

  public get connectionState(): Observable<AuthenticationState> {
    return this.connectionState$.asObservable();
  }

  public async get(): Promise<string | null> {
    if (this.currentJwtToken !== undefined) {
      return this.currentJwtToken;
    }

    const jwtToken = await this.storageService.get(this.storageKey);
    this.currentJwtToken = jwtToken;
    return jwtToken;
  }

  public async save(jwtToken: string): Promise<void> {
    await this.storageService.store(this.storageKey, jwtToken);
    await this.resetState();
    this.currentJwtToken = jwtToken;
  }

  public async delete(): Promise<void> {
    await this.storageService.delete(this.storageKey);
    await this.resetState();
  }

  private async resetState(): Promise<void> {
    this.currentJwtToken = undefined;
    await this.actualizeConnexionState();
  }

  private async actualizeConnexionState() {
    this.currentJwtToken = await this.get();

    this.connectionState$.next(
      this.currentJwtToken === null
        ? AuthenticationState.disconnected
        : AuthenticationState.connected
    );

    return this.connectionState$;
  }
}
