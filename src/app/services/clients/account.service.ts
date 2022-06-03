import { Injectable } from '@angular/core';
import {ConfigService} from '../config.service';
import {Config} from '../config.service.type';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse, RegisterResponse} from './account.service.type';

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

  public register(username: string, password: string): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(
    `${this.config.webService.url}/auth/register`,
    {
        username,
        password,
      }
    );
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${this.config.webService.url}/auth/login`,
      {
        username,
        password,
      }
    ).pipe(observer => {
      observer.subscribe(response => this.jwtToken = response.token);
      return observer;
    });
  }
}
