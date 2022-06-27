import {Component, OnInit} from '@angular/core';
import {AuthTokenService} from './services/auth-token.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public authLoaded: boolean;

  constructor(
    public authTokenService: AuthTokenService,
    private router: Router,
    private loadingController: LoadingController,
  ) { }

  ngOnInit(): void {
    const loaderTask = this.loadingController.create({
      message: 'Chargement en cours',
    });

    this.authTokenService.getAuthentificationState().subscribe(connectionState => {
      this.authLoaded = connectionState !== undefined;
      if (this.authLoaded) {
        loaderTask.then(loader => loader.dismiss());
      }
    });
  }
}
