import {ConfigService} from '@app/services/config.service';
import {Observable, of} from 'rxjs';
import {HttpBaseService} from '@app/services/http/http-baseService';
import {Note} from '@/app/entities/Note';
import {Payload} from '@app/services/http/common.type';
import {CreateNoteRequest, UpdateNoteRequest} from '@app/services/http/note-http.service.type';
import {makeNote} from '@/__fixtures__/NoteFixture';
import {faker} from '@faker-js/faker';

const fakeNotes = [
  makeNote(),
  makeNote(),
  makeNote(),
  makeNote(),
  makeNote(),
];

export class NoteHttpServiceMock extends HttpBaseService {

  private notes: Note[];

  constructor(
    configService: ConfigService,
    notes: Note[] = fakeNotes,
  ) {
    super(configService);
    this.notes = notes;
  }

  public getAll(): Observable<Payload<Note[]>> {
    return this.fromPayloadEndpoint(_ =>
      of({
        data: this.notes,
      })
    );
  }

  public getById(id): Observable<Payload<Note>> {
    return this.fromPayloadEndpoint(_ => {
        const filtered = this.notes.filter(note => note.id === id);
        if (filtered.length === 0) {
          return of({
            errors: ['Not found']
          });
        }

        return of({
          data: filtered[0],
        });
      }
    );
  }

  public create(body: CreateNoteRequest): Observable<Payload<Note>> {
    return this.fromPayloadEndpoint(_ => {
      const note: Note = {
        ...body,
        id: faker.datatype.uuid(),
        createdAt: new Date()
      };

      this.notes.push(note);
      return of({
        data: note,
      });
    });
  }

  public update(id: string, body: UpdateNoteRequest): Observable<Payload<undefined> | null> {
    return this.fromPayloadEndpoint(_ => {
      const filtered = this.notes.filter(note => note.id === id);
      if (filtered.length === 0) {
        return of({
          errors: ['Not found']
        });
      }

      const updatedNote: Note = {
        ...filtered[0],
        ...body
      };

      this.notes = [
        ...this.notes.filter(note => note.id !== id),
        updatedNote
      ];

      return of({
        data: undefined,
      });
    });
  }

  public delete(id: string): Observable<Payload<undefined> | null> {
    return this.fromPayloadEndpoint(_ => {
      const filtered = this.notes.filter(note => note.id === id);
      if (filtered.length === 0) {
        return of({
          errors: ['Not found']
        });
      }

      this.notes = [
        ...this.notes.filter(note => note.id !== id),
      ];

      return of({
        data: undefined,
      });
    });
  }

  protected getEndpoint(apiRootUrl: string): string {
    return ``;
  }
}
