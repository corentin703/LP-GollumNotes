import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from './config.service.type';
import * as ConfigurationFile from '@assets/config.json';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {i18nMetaToJSDoc} from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configUrl: string = 'assets/config.json';
  private config: BehaviorSubject<Config> = new BehaviorSubject<Config>(ConfigurationFile);
  private hasBeenFetched = false;

  constructor(
    private http: HttpClient
  ) { }

  public getConfig(): Observable<Config> {
    if (!this.hasBeenFetched) {
      this.fetchConfig();
    }

    return this.config.asObservable();
  }

  private fetchConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        tap(config => {
          this.config.next(config);
          this.hasBeenFetched = true;
        })
      );
  }
}
