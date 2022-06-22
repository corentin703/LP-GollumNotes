import { Component, OnInit } from '@angular/core';
import {AccountHttpService} from '@app/services/http/account-http.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public errors: Array<string>;

  private username$: string;
  private password$: string;

  constructor(
    private accountService: AccountHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username$, [
        Validators.required,
        Validators.minLength(1)
      ]),
      password: new FormControl(this.password$, [
        Validators.required,
        Validators.minLength(1)
      ]),
    });
  }

  public onLogin() {
    const { username, password } = this.loginForm.value;

    this.accountService.login(username, password)
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
