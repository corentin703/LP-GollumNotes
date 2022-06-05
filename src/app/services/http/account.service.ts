import { Injectable } from '@angular/core';
import {ConfigService} from '../config.service';
import {Config} from '../config.service.type';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse, RegisterResponse} from './account.service.type';
import {Payload} from './common.type';
import {tap} from 'rxjs/operators';
import {AuthTokenService} from './auth-token.service';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private config: Config;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private authTokenService: AuthTokenService,
  ) {
    this.config = configService.getConfig();
  }

  private get baseUrl() {
    return `${this.config.webService.url}/auth`;
  }

  public register(username: string, password: string): Observable<Payload<RegisterResponse>> {
    return this.httpClient.post<Payload<RegisterResponse>>(
    `${this.baseUrl}/register`,
    {
        username,
        password,
      }
    );
  }

  public login(username: string, password: string): Observable<Payload<LoginResponse>> {
    return this.httpClient.post<Payload<LoginResponse>>(
      `${this.baseUrl}/login`,
      {
        username,
        password,
      }
    ).pipe(
      tap(async response => await this.authTokenService.save(response.data.token)),
    );
  }

  public  logout(): Observable<void> {
    const handle = async () => {
      await this.authTokenService.delete();
    };

    return fromPromise(handle());
  }
}
