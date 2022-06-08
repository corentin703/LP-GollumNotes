import {Injectable} from '@angular/core';
import {AuthTokenService} from '../http/auth-token.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationState} from '../http/auth-token-service.type';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private isLoggedIn: boolean | undefined;

  constructor(
    private authTokenService: AuthTokenService,
    private router: Router
  ) {
    this.authTokenService.connectionState.subscribe(authState => {
      this.isLoggedIn = authState === AuthenticationState.connected;
      console.log(this.isLoggedIn);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isOnAuthPages = this.router.url !== '/login' && this.router.url !== '/register';

    if (this.isLoggedIn) {
      return this.loggedInCase(isOnAuthPages);
    }

    return this.loggedOutCase(isOnAuthPages);
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
