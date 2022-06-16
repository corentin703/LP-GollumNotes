import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Note} from '@app/entities/Note';
import {NoteHttpService} from '@app/services/http/note-http.service';
import {map, tap} from 'rxjs/operators';
import {CreateNoteRequest, UpdateNoteRequest} from '@app/services/http/note-http.service.type';

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService {
  private readonly notes$ = new BehaviorSubject<Note[]>(undefined);

  constructor(
    private noteHttpService: NoteHttpService
  ) {
    this.refreshCollection();
  }

  public getAll(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  public getById(id: string): Observable<Note> {
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

  public create(body: CreateNoteRequest): Observable<Note> {
    return this.noteHttpService.create(body)
      .pipe(
        map(response => {
          if (response.data === undefined) {
            return null;
          }

          return response.data;
        })
      )
      .pipe(
        tap(createdNote => {
          if (createdNote === null) {
            return;
          }

          this.notes$.next([
            ...this.notes$.value,
            createdNote
          ]);
        })
      );
  }

  public update(id: string, body: UpdateNoteRequest): Observable<Note> {
    return from(this.handleUpdate(id, body));
  }

  public delete(id: string): Observable<void> {
    return this.noteHttpService.delete(id)
      .pipe(tap(_ =>
        this.notes$.next(
          this.notes$.value.filter(note => note.id !== id)
        )
      ));
  }

  private async handleUpdate(id: string, body: UpdateNoteRequest): Promise<Note> {
    await this.noteHttpService.update(id, body);
    const filteredNotes = this.notes$.value.filter(note => note.id !== id);
    const updatingNote = await this.getById(id).toPromise();

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

    return updatedNote;
  }

  private refreshCollection() {
    this.noteHttpService.getAll().subscribe(notes => {
      if (notes.data !== undefined) {
        this.notes$.next(notes.data);
      }
    });
  }
}
