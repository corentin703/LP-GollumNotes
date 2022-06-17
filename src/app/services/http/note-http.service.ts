import {Injectable} from '@angular/core';
import {ConfigService} from '@app/services/config.service';
import {HttpClient} from '@angular/common/http';
import {CreateNoteRequest, UpdateNoteRequest} from './note-http.service.type';
import {Observable} from 'rxjs';
import {Payload} from './common.type';
import {HttpBaseService} from '@app/services/http/http-baseService';
import {Note} from '@/app/entities/Note';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteHttpService extends HttpBaseService {


  constructor(
    configService: ConfigService,
    private httpClient: HttpClient,
  ) {
    super(configService);
  }

  public getAll(): Observable<Payload<Note[]>> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.get<Payload<Note[]>>(endpoint)
    );
  }

  public getById(id): Observable<Payload<Note[]>> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.get<Payload<Note[]>>(`${endpoint}/${id}`)
    );
  }

  public create(body: CreateNoteRequest): Observable<Payload<Note>> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.post<Payload<Note>>(endpoint, body)
    );
  }

  public update(id: string, body: UpdateNoteRequest): Observable<Payload<void>> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.put<Payload<void>>(`${endpoint}/${id}`, body)
        .pipe(map(response => this.mapEmptyResponse(response)))
    );
  }

  public delete(id: string): Observable<Payload<void>> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.delete<Payload<void>>(`${endpoint}/${id}`)
        .pipe(response => this.mapEmptyResponse(response))
    );
  }

  protected getEndpoint(apiRootUrl: string): string {
    return `${apiRootUrl}/notes`;
  }

  private mapEmptyResponse = (response => {
    if (response !== undefined && response !== null) {
      return response;
    }

    return {
      messages: []
    };
  });
}
