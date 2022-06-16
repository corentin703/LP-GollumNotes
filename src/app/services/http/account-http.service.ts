import { Injectable } from '@angular/core';
import {ConfigService} from '@app/services/config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse, RegisterResponse} from './account-http.service.type';
import {Payload} from './common.type';
import {tap} from 'rxjs/operators';
import {AuthTokenService} from '@/app/services/auth-token.service';
import {fromPromise} from 'rxjs/internal-compatibility';
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
    return this.fromEndpoint(endpoint =>
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
    return this.fromEndpoint(endpoint =>
      this.httpClient.post<Payload<LoginResponse>>(
        `${endpoint}/login`,
        {
          username,
          password,
        }
      )
    ).pipe(
      tap(async response => await this.authTokenService.save(response.data.token)),
    );
  }

  public logout(): Observable<void> {
    const handle = async () => {
      await this.authTokenService.delete();
    };

    return fromPromise(handle());
  }

  protected getEndpoint(apiRootUrl: string): string {
    return `${apiRootUrl}/auth`;
  }
}
