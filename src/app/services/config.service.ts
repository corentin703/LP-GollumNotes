import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from './config.service.type';
import * as ConfigurationFile from '@assets/config.json';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configUrl: string = 'assets/config.json';
  private config$: BehaviorSubject<Config> = new BehaviorSubject<Config>(ConfigurationFile);

  constructor(private http: HttpClient) {
    this.getConfigNetwork();
  }

  public getConfig(): Observable<Config> {
    return this.config$.asObservable();
  }

  private getConfigNetwork(): Observable<Config> {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        tap(config => this.config$.next(config))
      );
  }
}
