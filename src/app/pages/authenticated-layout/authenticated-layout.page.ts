import { Component, OnInit } from '@angular/core';
import {AccountHttpService} from '@app/services/http/account-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.page.html',
  styleUrls: ['./authenticated-layout.page.scss'],
})
export class AuthenticatedLayoutPage implements OnInit {

  public appPages = [
    { title: 'Notes', url: '/notes', icon: 'home' },
    // { title: 'Rappels', url: '/notes/rappels', icon: 'bulb' },
    // { title: 'Archive', url: '/notes/archive', icon:'archive' },
  ];

  constructor(
    private accountHttpService: AccountHttpService,
    private router: Router,
  ) { }

  public ngOnInit() {
    //
  }

  public logout() {
    this.accountHttpService.logout()
      .subscribe(_ => this.router.navigateByUrl('/login'));
  }
}
