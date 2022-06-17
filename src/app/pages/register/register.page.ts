import {Component, OnInit} from '@angular/core';
import {AccountHttpService} from '@app/services/http/account-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public username: string;
  public password: string;

  public errors: Array<string>;

  constructor(
    private accountService: AccountHttpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onSubscriptionClick() {
    this.accountService.register(this.username, this.password)
      .subscribe(response => {
        if (response.errors !== undefined) {
          this.errors = response.errors;
          return;
        }
        if (response.data !== undefined) {
          this.onReturnClick();
        }
      });
  }

  public onReturnClick() {
    this.router.navigateByUrl('/login');
  }
}
