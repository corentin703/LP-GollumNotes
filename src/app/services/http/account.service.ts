import { Injectable } from '@angular/core';
import {ConfigService} from '../config.service';
import {Config} from '../config.service.type';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse, RegisterResponse} from './account.service.type';
import {Payload} from './common.type';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private config: Config | null;
  private jwtToken: string | null = null;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
  ) {
    configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }

  public get authToken(): string | null {
    return this.jwtToken;
  }

  public register(username: string, password: string): Observable<Payload<RegisterResponse>> {
    return this.httpClient.post<Payload<RegisterResponse>>(
    `${this.config.webService.url}/auth/register`,
    {
        username,
        password,
      }
    );
  }

  public login(username: string, password: string): Observable<Payload<LoginResponse>> {
    return this.httpClient.post<Payload<LoginResponse>>(
      `${this.config.webService.url}/auth/login`,
      {
        username,
        password,
      }
    ).pipe(
      tap(response => this.jwtToken = response.data.token),
    );
  }
}
