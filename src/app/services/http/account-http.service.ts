import { Injectable } from '@angular/core';
import {ConfigService} from '@app/services/config.service';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {LoginResponse, RegisterResponse} from './account-http.service.type';
import {Payload} from './common.type';
import {tap} from 'rxjs/operators';
import {AuthTokenService} from '@/app/services/auth-token.service';
import {HttpBaseService} from '@app/services/http/http-baseService';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService extends HttpBaseService {

  constructor(
    configService: ConfigService,
    private httpClient: HttpClient,
    private authTokenService: AuthTokenService,
  ) {
    super(configService);
  }

  public register(username: string, password: string): Observable<Payload<RegisterResponse>> {
    return this.fromPayloadEndpoint(endpoint =>
      this.httpClient.post<Payload<RegisterResponse>>(
        `${endpoint}/register`,
        {
          username,
          password,
        }
      )
    );
  }

  public login(username: string, password: string): Observable<Payload<LoginResponse>> {
    return this.fromPayloadEndpoint(endpoint =>
      this.httpClient.post<Payload<LoginResponse>>(
        `${endpoint}/login`,
        {
          username,
          password,
        }
      )
    ).pipe(
      tap(async response => {
        if (response.errorStatus === undefined) {
          await this.authTokenService.save(response.data.token);
        }
      }),
    );
  }

  public logout(): Observable<void> {
    const handle = async () => {
      await this.authTokenService.delete();
    };

    return from(handle());
  }

  protected getEndpoint(apiRootUrl: string): string {
    return `${apiRootUrl}/auth`;
  }
}
