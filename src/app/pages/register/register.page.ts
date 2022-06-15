import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/http/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onSubscriptionClick() {
    this.accountService.register(this.username, this.password)
      .subscribe(response => {
        if (response.data !== undefined) {
          // this.router.navigateByUrl('/login');
          this.onReturnClick();
        }
      });
  }

  public onReturnClick() {
    this.router.navigateByUrl('/login');
  }
}
