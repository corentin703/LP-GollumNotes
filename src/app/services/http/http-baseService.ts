import {ConfigService} from '@app/services/config.service';
import {Observable} from 'rxjs';
import {Config} from '@app/services/config.service.type';
import {mergeMap} from 'rxjs/operators';

export abstract class HttpBaseService {

  constructor(
    protected readonly configService$: ConfigService
  ) { }

  protected fromConfig<T>(callback: (config: Config, index: number) => Observable<T>): Observable<T> {
    return this.configService$.config.pipe(
      mergeMap(callback)
    );
  }

  protected fromEndpoint<T>(callback: (endpoint: string, index: number) => Observable<T>, ...endpointArgs: string[]): Observable<T> {
    return this.fromConfig(
      (config, index) => callback(
        this.getEndpoint(config.webService.url, ...endpointArgs),
        index
      )
    );
  }

  protected abstract getEndpoint(apiRootUrl: string, ...endpointArgs: string[]): string;
}
