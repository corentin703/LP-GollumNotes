import { Injectable } from '@angular/core';
import {ConfigService} from '@app/services/config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PictureResponse} from './picture-http.service.type';
import {Payload} from './common.type';
import {HttpDownloadService} from './http-download.service';
import {HttpBaseService} from '@app/services/http/http-baseService';

@Injectable({
  providedIn: 'root'
})
export class PictureHttpService extends HttpBaseService {

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private download: HttpDownloadService,
  ) {
    super(configService);
  }

  public getAll(noteId: string): Observable<Payload<PictureResponse[]>> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.get<Payload<PictureResponse[]>>(endpoint),
      noteId
    );
  }

  public getById(noteId: string, pictureId: string): Observable<Payload<PictureResponse>> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.get<Payload<PictureResponse>>(`${endpoint}/${pictureId}`),
      noteId
    );
  }

  public getContentById(noteId: string, pictureId: string): Observable<Blob> {
    return this.fromEndpoint(
      endpoint => this.download.download(`${endpoint}/${pictureId}`),
      noteId
    );
  }

  public create(noteId: string, pictureBlob: Blob): Observable<Payload<PictureResponse>> {
    const formData = new FormData();
    formData.append('file', pictureBlob);

    return this.fromEndpoint(
      endpoint => this.httpClient.post<Payload<PictureResponse>>(endpoint, formData),
      noteId
    );
  }

  public delete(noteId: string, pictureId: string): Observable<Payload<undefined> | null> {
    return this.fromEndpoint(
      endpoint => this.httpClient.delete<Payload<undefined> | null>(`${endpoint}/${pictureId}`),
      noteId
    );
  }

  protected getEndpoint(apiRootUrl: string, ...endpointArgs: string[]): string {
    if (endpointArgs.length === 0) {
      throw new Error('Note Id not provided');
    }

    const noteId = endpointArgs[0];
    return `${apiRootUrl}/notes/${noteId}/pictures`;
  }
}
