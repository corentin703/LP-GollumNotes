import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, from, lastValueFrom} from 'rxjs';
import {AuthTokenService} from '@app/services/auth-token.service';


@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(private authTokenService: AuthTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>>  {
    const userToken = await lastValueFrom(this.authTokenService.get());

    if (userToken == null) {
      return await lastValueFrom(next.handle(req));
    }

    const authorizedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });

    return await lastValueFrom(next.handle(authorizedRequest));
  }
}
