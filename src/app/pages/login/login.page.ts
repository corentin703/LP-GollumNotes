import { Component, OnInit } from '@angular/core';
import {AccountHttpService} from '@app/services/http/account-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string;
  public password: string;

  public errors: Array<string>;

  constructor(
    private accountService: AccountHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    //
  }

  public onConnectionClick() {
    this.accountService.login(this.username, this.password)
      .subscribe(result => {
        if (result.errors !== undefined) {
          this.errors = result.errors;
          return;
        }
        this.router.navigateByUrl('/notes');
      });
  }

  public onSubscriptionClick() {
    this.router.navigateByUrl('/register');
  }
}
