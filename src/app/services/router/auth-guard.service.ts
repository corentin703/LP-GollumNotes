import {Injectable} from '@angular/core';
import {AuthTokenService} from '../http/auth-token.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationState} from '../http/auth-token-service.type';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authTokenService: AuthTokenService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authTokenService.getAuthentificationState().pipe(
      map(connectionState => {
        const isOnAuthPages = state.url === '/login' || state.url === '/register';

        if (connectionState === AuthenticationState.connected) {
          return this.loggedInCase(isOnAuthPages);
        }

        return this.loggedOutCase(isOnAuthPages);
      })
    );
  }

  private loggedInCase(isOnAuthPages: boolean): boolean {
    if (isOnAuthPages) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }

  private loggedOutCase(isOnAuthPages: boolean): boolean {
    if (isOnAuthPages) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
