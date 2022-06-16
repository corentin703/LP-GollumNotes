import {Component, OnInit} from '@angular/core';
import {AuthTokenService} from './services/auth-token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public authLoaded: boolean;

  constructor(
    public authTokenService: AuthTokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authTokenService.getAuthentificationState().subscribe(connectionState => {
      this.authLoaded = connectionState !== undefined;
    });
  }
}
