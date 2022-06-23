import {Injectable} from '@angular/core';
import {PictureHttpService} from '@app/services/http/picture-http.service';
import {Picture} from '@app/entities/Picture';
import {from, Observable, of, Subject} from 'rxjs';
import {Payload} from '@app/services/http/common.type';
import {PictureUpdate} from '@app/services/stores/picture-store.service.type';
import {tap, mergeMap, switchMap} from 'rxjs/operators';
import {Photo} from '@capacitor/camera';
import {decode, encode} from 'base64-arraybuffer';

@Injectable({
  providedIn: 'root'
})
export class PictureStoreService {
  private pictureUpdateSubject$: Subject<PictureUpdate> = new Subject<PictureUpdate>();

  // private picturesByNotes$: BehaviorSubject<PicturesByNotesDictionary> = new BehaviorSubject<PicturesByNotesDictionary>({ });

  constructor(
    private pictureHttpService: PictureHttpService
  ) { }

  // public get picturesByNotes(): Observable<PicturesByNotesDictionary> {
  //   return this.picturesByNotes$.asObservable();
  // }

  public get pictureUpdateObservable(): Observable<PictureUpdate> {
    return this.pictureUpdateSubject$.asObservable();
  }

  public getAll(noteId: string): Observable<Payload<Picture[]>> {
    // if (this.picturesByNotes$.value[noteId] !== undefined) {
    //   return of({
    //     data: this.picturesByNotes$.value[noteId]
    //   });
    // }

    return this.pictureHttpService.getAll(noteId);
      // .pipe(tap(response => {
      //   if (response.errors !== undefined || response.data === null) {
      //     return;
      //   }
      //
      //   const picturesByNotes: PicturesByNotesDictionary = {
      //     ...this.picturesByNotes$.value,
      //   };
      //   picturesByNotes[noteId] = response.data;
      //   this.picturesByNotes$.next(picturesByNotes);
      // }));
  }

  public getById(noteId: string, id: string): Observable<Payload<Picture>> {
    // const filteredPictures = this.picturesByNotes$.value[noteId]?.filter(picture => picture.id === id);

    // if (filteredPictures.length !== 0) {
    //   return of({
    //     data: filteredPictures[0]
    //   });
    // }

    return this.pictureHttpService.getById(noteId, id);
      // .pipe(tap(response => {
      //   if (response.errors !== undefined || response.data === null) {
      //     return;
      //   }
      //
      //   const picturesByNotes: PicturesByNotesDictionary = {
      //     ...this.picturesByNotes$.value,
      //   };
      //
      //   picturesByNotes[noteId].push(response.data);
      //   this.picturesByNotes$.next(picturesByNotes);
      // }));
  }

  public getContentById(noteId: string, id: string): Observable<string | Payload<undefined>> {
    // const filteredPicturesBlob = this.picturesByNotes$.value[noteId]?.filter(picture => picture.id === id).map(picture => picture.blob);

    // if (filteredPicturesBlob.length !== 0) {
    //   return of(filteredPicturesBlob[0]);
    // }

    return this.pictureHttpService.getContentById(noteId, id)
      .pipe(switchMap(async (response) => {
        const payloadResponse = response as Payload<undefined>;
        if (payloadResponse.errors !== undefined) {
          return payloadResponse;
        }

        const blob = response as Blob;
        return encode(await blob.arrayBuffer());
      }));
      // .pipe(tap(response => {
      //   if ((response as Payload<undefined>).errors !== undefined) {
      //     return;
      //   }
      //
      //   const blob = response as Blob;
      //   if (blob.size === undefined) {
      //     return;
      //   }
      //
      //   const picturesByNotes = this.picturesByNotes$.value;
      //   const filteredPictures = picturesByNotes.value[noteId]?.filter(picture => picture.id === id);
      //   if (filteredPictures.length === 0) {
      //     return;
      //   }
      //
      //   filteredPictures[0].blob = blob;
      //   this.picturesByNotes$.next(picturesByNotes);
      // }));
  }

  public create(noteId: string, photo: Photo): Observable<Payload<Picture>> {
    if (photo.base64String === undefined) {
      throw new Error('Not a base64 encoded photo : can\'t send');
    }

    const pictureBlob = new Blob([new Uint8Array(decode(photo.base64String))], {
      type: `image/${photo.format}`,
    });

    return this.pictureHttpService.create(noteId, pictureBlob)
      .pipe(tap(response => {
        if (response.errors !== undefined && response.data !== null) {
          return;
        }

        const picture: Picture = {
          ...response.data,
          base64: photo.base64String,
        };

        // const picturesByNotes = this.picturesByNotes$.value;
        // picturesByNotes[noteId]?.push(picture);

        this.pictureUpdateSubject$.next({
          crudAction: 'create',
          picture,
          noteId,
        });
      }));
  }

  public delete(noteId: string, id: string): Observable<Payload<void>> {
    return this.pictureHttpService.delete(noteId, id)
      .pipe(tap(response => {
        if (response.errors !== undefined && response.data !== null) {
          return;
        }

        // const picturesByNotes = this.picturesByNotes$.value;
        // if (picturesByNotes[noteId] === undefined) {
        //   return;
        // }
        //
        // const filteredPictures = picturesByNotes[noteId]?.filter(picture => picture.id === id);
        // if (filteredPictures.length === 0) {
        //   return;
        // }

        this.pictureUpdateSubject$.next({
          noteId,
          pictureId: id,
          crudAction: 'delete',
        });

        // picturesByNotes[noteId] = picturesByNotes[noteId].filter(picture => picture.id !== id);
        // this.picturesByNotes$.next(picturesByNotes);
      }));
  }
}
