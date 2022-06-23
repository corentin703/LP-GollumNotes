import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Note} from '@app/entities/Note';
import {NoteHttpService} from '@app/services/http/note-http.service';
import {first, map, tap} from 'rxjs/operators';
import {CreateNoteRequest, UpdateNoteRequest} from '@app/services/http/note-http.service.type';
import {Payload} from '@app/services/http/common.type';
import {PictureStoreService} from '@app/services/stores/picture-store.service';

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService {
  private readonly notes$ = new BehaviorSubject<Note[]>(undefined);

  constructor(
    private noteHttpService: NoteHttpService,
    private pictureStore: PictureStoreService,
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
        this.loadPictures();
      }
    });
  }

  private loadPictures() {
    this.notes$.value?.forEach(note => {
      note.pictures?.forEach(picture => {
        this.pictureStore.getContentById(note.id, picture.id).subscribe(response => {
          if ((response as Payload<undefined>).errors !== undefined) {
            return;
          }

          const base64Picture = response as string;

          const notes = this.notes$.value;
          const updatedNote = notes.find(it => it.id === note.id);
          updatedNote.pictures.find(it => it.id = picture.id).base64 = base64Picture;

          this.notes$.next(notes);
        });
      });
    });

    this.pictureStore.pictureUpdateObservable.subscribe(pictureUpdate => {
      const notes = this.notes$.value;
      const noteToUpdate = notes.find(note => note.id === pictureUpdate.noteId);
      if (noteToUpdate === undefined) {
        return undefined;
      }

      if (pictureUpdate.crudAction === 'create' && pictureUpdate.picture !== undefined) {
        noteToUpdate.pictures.push(pictureUpdate.picture);
        this.notes$.next(notes);
        return;
      }

      if (pictureUpdate.crudAction === 'delete' && pictureUpdate.pictureId !== undefined) {
        noteToUpdate.pictures = noteToUpdate.pictures.filter(picture => picture.id !== pictureUpdate.pictureId);
        this.notes$.next(notes);
        return;
      }
    });
  }
}
