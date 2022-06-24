import {Injectable} from '@angular/core';
import {PictureHttpService} from '@app/services/http/picture-http.service';
import {Picture} from '@app/entities/Picture';
import {Observable, Subject} from 'rxjs';
import {Payload} from '@app/services/http/common.type';
import {PictureUpdateEvent} from '@app/services/stores/picture-store.service.type';
import {tap, switchMap} from 'rxjs/operators';
import {Photo} from '@capacitor/camera';
import {decode, encode} from 'base64-arraybuffer';

@Injectable({
  providedIn: 'root'
})
export class PictureStoreService {
  private pictureUpdateSubject$: Subject<PictureUpdateEvent> = new Subject<PictureUpdateEvent>();

  constructor(
    private pictureHttpService: PictureHttpService
  ) { }

  public get pictureUpdateObservable(): Observable<PictureUpdateEvent> {
    return this.pictureUpdateSubject$.asObservable();
  }

  public getContentById(noteId: string, id: string): Observable<string | Payload<undefined>> {
    return this.pictureHttpService.getContentById(noteId, id)
      .pipe(switchMap(async (response) => {
        const payloadResponse = response as Payload<undefined>;
        if (payloadResponse.errors !== undefined) {
          return payloadResponse;
        }

        const blob = response as Blob;
        return encode(await blob.arrayBuffer());
      }));
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

        this.pictureUpdateSubject$.next({
          noteId,
          pictureId: id,
          crudAction: 'delete',
        });
      }));
  }
}
