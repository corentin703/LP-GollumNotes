import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {AuthTokenService} from '@app/services/auth-token.service';
import {first} from 'rxjs/operators';


@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(private authTokenService: AuthTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>>  {
    const userToken = await this.authTokenService.get().toPromise();

    if (userToken == null) {
      return await next.handle(req).toPromise();
    }

    const authorizedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });

    return await next.handle(authorizedRequest).toPromise();
  }
}
