import {Injectable} from '@angular/core';
import {ConfigService} from '@app/services/config.service';
import {HttpClient} from '@angular/common/http';
import {CreateNoteRequest, UpdateNoteRequest} from './note.service.type';
import {Observable} from 'rxjs';
import {Payload} from './common.type';
import {HttpBaseService} from '@app/services/http/http-baseService';
import {Note} from '@/app/entities/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends HttpBaseService {
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
    console.log(body);

    return this.fromEndpoint(endpoint =>
      this.httpClient.post<Payload<Note>>(endpoint, body)
    );
  }

  public update(id: string, body: UpdateNoteRequest): Observable<void> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.put<void>(`${endpoint}/${id}`, body)
    );
  }

  public delete(id: string): Observable<void> {
    return this.fromEndpoint(endpoint =>
      this.httpClient.delete<void>(`${endpoint}/${id}`)
    );
  }

  protected getEndpoint(apiRootUrl: string): string {
    return `${apiRootUrl}/notes`;
  }
}
