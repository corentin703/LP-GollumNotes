import {Component, OnInit} from '@angular/core';
import {AccountHttpService} from '@app/services/http/account-http.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public errors: Array<string>;
  public registerForm: FormGroup;

  private username$: string;
  private password$: string;

  constructor(
    private accountService: AccountHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
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

  public onRegister() {
    const { username, password } = this.registerForm.value;

    this.accountService.register(username, password)
      .subscribe(response => {
        if (response.errors !== undefined) {
          this.errors = response.errors;
          return;
        }

        this.onReturnClick();
      });
  }

  public onReturnClick() {
    this.router.navigateByUrl('/login');
  }
}
