import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService} from '../http/account.service';

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.accountService.authToken;

    if (userToken == null) {
      return next.handle(req);
    }

    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });

    return next.handle(modifiedReq);
  }
}
