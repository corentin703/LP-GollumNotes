import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from './config.service.type';
import * as ConfigurationFile from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configUrl: string = 'assets/config.json';
  private config: Config = ConfigurationFile;

  constructor(private http: HttpClient) {
    this.getConfigNetwork().then(config => this.config = config);
  }

  public getConfig(): Config {
    return this.config;
  }

  public async getConfigNetwork(): Promise<Config> {
    if (this.config === null) {
      this.config = await this.http.get<Config>(this.configUrl).toPromise();
    }

    return this.config;
  }
}
