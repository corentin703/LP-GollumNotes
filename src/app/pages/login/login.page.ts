import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/http/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onConnectionClick() {
    this.accountService.login(this.username, this.password)
      .subscribe(() => this.router.navigateByUrl('/notes'));
  }

  public onSubscriptionClick() {
    this.router.navigateByUrl('/register');
  }
}
