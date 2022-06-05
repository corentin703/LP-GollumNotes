import { Injectable } from '@angular/core';
import {Config} from '../config.service.type';
import {ConfigService} from '../config.service';
import {HttpClient} from '@angular/common/http';
import {CreateNoteRequest, Note, UpdateNoteRequest} from './note.service.type';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Payload} from './common.type';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private config: Config | null;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
  ) {
    configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }

  private get baseUrl() {
    return `${this.config.webService.url}/notes`;
  }

  public getAll(): Observable<Payload<Note[]>> {
    return this.httpClient.get<Payload<Note[]>>(this.baseUrl);
  }

  public getById(id): Observable<Payload<Note[]>> {
    return this.httpClient.get<Payload<Note[]>>(`${this.baseUrl}/${id}`);
  }

  public create(body: CreateNoteRequest): Observable<Payload<Note>> {
    return this.httpClient.post<Payload<Note>>(this.baseUrl, body);
  }

  public update(id: string, body: UpdateNoteRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/${id}`, body);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
