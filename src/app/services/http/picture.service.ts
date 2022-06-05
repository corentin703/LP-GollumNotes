import { Injectable } from '@angular/core';
import {Config} from '../config.service.type';
import {ConfigService} from '../config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PictureResponse} from './picture.service.type';
import {Payload} from './common.type';
import {DownloadService} from './download.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private config: Config | null;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private download: DownloadService,
  ) {
    configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }

  public getAll(noteId: string): Observable<Payload<PictureResponse[]>> {
    return this.httpClient.get<Payload<PictureResponse[]>>(
      this.getBaseUrl(noteId)
    );
  }

  public getById(noteId: string, pictureId: string): Observable<Payload<PictureResponse>> {
    return this.httpClient.get<Payload<PictureResponse>>(
      `${this.getBaseUrl(noteId)}/${pictureId}`
    );
  }

  public getContentById(noteId: string, pictureId: string): Observable<Blob> {
    return this.download.download(`${this.getBaseUrl(noteId)}/${pictureId}`);
  }

  public create(noteId: string, pictureBlob: Blob): Observable<Payload<PictureResponse>> {
    const formData = new FormData();
    formData.append('file', pictureBlob);

    return this.httpClient.post<Payload<PictureResponse>>(this.getBaseUrl(noteId), formData);
  }

  public delete(noteId: string, pictureId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.getBaseUrl(noteId)}/${pictureId}`
    );
  }

  private getBaseUrl(noteId: string) {
    return `${this.config.webService.url}/notes/${noteId}/pictures`;
  }
}
