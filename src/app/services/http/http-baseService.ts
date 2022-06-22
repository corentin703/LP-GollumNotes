import {ConfigService} from '@app/services/config.service';
import {catchError, Observable, of} from 'rxjs';
import {Config} from '@app/services/config.service.type';
import {mergeMap} from 'rxjs/operators';
import {Payload} from '@app/services/http/common.type';
import {HttpErrorResponse} from '@angular/common/http';

export abstract class HttpBaseService {

  constructor(
    protected readonly configService$: ConfigService
  ) { }

  protected catchErrors<T>() {
    return catchError<Payload<T>, Observable<Payload<T>>>((error, caught) => {
      if (error instanceof HttpErrorResponse)
      {
        return of({
          ...error.error,
          errorStatus: error.status,
          errorStatusText: error.statusText,
        });
      }

      throw error;
    });
  }

  protected fromConfig<T>(callback: (config: Config, index: number) => Observable<T>): Observable<T> {
    return this.configService$.getConfig().pipe(
      mergeMap(callback)
    );
  }

  protected fromEndpoint<T>(callback: (endpoint: string, index: number) => Observable<T>, ...endpointArgs: string[]): Observable<T> | Observable<Payload<undefined>> {
    return this.fromConfig(
      (config, index) => callback(
        this.getEndpoint(config.webService.url, ...endpointArgs),
        index
      )
    ).pipe(this.catchErrors());
  }

  protected fromPayloadEndpoint<T>(callback: (endpoint: string, index: number) => Observable<Payload<T>>, ...endpointArgs: string[]): Observable<Payload<T>> {
    return this.fromConfig(
      (config, index) => callback(
        this.getEndpoint(config.webService.url, ...endpointArgs),
        index
      )
    ).pipe(this.catchErrors());
  }

  protected abstract getEndpoint(apiRootUrl: string, ...endpointArgs: string[]): string;
}
