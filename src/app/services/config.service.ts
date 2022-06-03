import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from './config.service.type';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configUrl: string = 'assets/config.json';

  constructor(private http: HttpClient) {}

  public getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl);
  }
}
