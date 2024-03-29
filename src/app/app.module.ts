import {LOCALE_ID, NgModule} from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage-angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@/environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpAuthorizationInterceptor} from './services/interceptors/HttpAuthorizationInterceptor';
import {LoadingComponent} from './components/loading/loading.component';
import {AuthGuardService} from './services/router/auth-guard.service';
import { Camera } from '@ionic-native/camera/ngx';

import {registerLocaleData} from '@angular/common';
registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthorizationInterceptor, multi: true},
    AuthGuardService,
    Camera,
  ],
  bootstrap: [AppComponent],
  exports: [
    LoadingComponent
  ]
})
export class AppModule {}
