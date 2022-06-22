import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Note} from '@app/entities/Note';
import {NoteHttpService} from '@app/services/http/note-http.service';
import {first, map, tap} from 'rxjs/operators';
import {CreateNoteRequest, UpdateNoteRequest} from '@app/services/http/note-http.service.type';
import {IEntityStoreService} from '@app/contracts/services/stores/entity-store-service';
import {Payload} from '@app/services/http/common.type';

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService implements IEntityStoreService<Note, CreateNoteRequest, UpdateNoteRequest> {
  private readonly notes$ = new BehaviorSubject<Note[]>(undefined);

  constructor(
    private noteHttpService: NoteHttpService
  ) {
    this.refreshCollection();
  }

  public getAll(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  public getById(id: string): Observable<Note | null> {
    return this.notes$
      .asObservable()
      .pipe(
        map(notes => {
          const filtered = notes.filter(note => note.id === id);
          if (filtered.length === 0) {
            return null;
          }

          return filtered[0];
        })
      );
  }

  public create(body: CreateNoteRequest): Observable<Payload<Note>> {
    return this.noteHttpService.create(body)
      .pipe(
        tap(response => {
          if (response.errorStatus !== undefined || response.data === null) {
            return;
          }

          this.notes$.next([
            ...this.notes$.value,
            response.data
          ]);
        })
      );
  }

  public update(id: string, body: UpdateNoteRequest): Observable<Payload<Note>> {
    return from(this.handleUpdate(id, body));
  }

  public delete(id: string): Observable<Payload<void>> {
    return this.noteHttpService.delete(id)
      .pipe(tap(_ =>
        this.notes$.next(
          this.notes$.value.filter(note => note.id !== id)
        )
      ));
  }

  private async handleUpdate(id: string, body: UpdateNoteRequest): Promise<Payload<Note>> {
    const response = await this.noteHttpService.update(id, body).pipe(first()).toPromise();

    if (response !== null && response.errors !== undefined) {
      return {
        ...response,
        data: null,
      };
    }

    const filteredNotes = this.notes$.value.filter(note => note.id !== id);
    const updatingNote = await this.getById(id).pipe(first()).toPromise();

    if (updatingNote === null) {
      this.refreshCollection();
      return;
    }
    const updatedNote = {
      ...updatingNote,
      ...body
    };
    this.notes$.next([
      ...filteredNotes,
      updatedNote
    ]);

    return {
      ...response,
      data: updatedNote,
    };
  }

  private refreshCollection() {
    this.noteHttpService.getAll().subscribe(notes => {
      if (notes.data !== undefined) {
        this.notes$.next(notes.data);
      }
    });
  }
}
