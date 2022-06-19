import {ConfigService} from '@app/services/config.service';
import {Observable, of} from 'rxjs';
import {Config} from '@app/services/config.service.type';

export const fakeConfig: Config = {
  webService: {
    url: 'https://gollum-notes.app/api'
  }
};

class ConfigServiceMock {

  getConfig(): Observable<Config> {
    return of(fakeConfig);
  }
}

export const configServiceMock: ConfigService = new ConfigServiceMock() as unknown as ConfigService;
