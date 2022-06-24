import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {Filesystem} from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async takePhoto(): Promise<Photo> {
    return await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90,
      saveToGallery: false,
    });
  }

  public async pickPhoto(): Promise<Photo[]> {
    const images = await Camera.pickImages({
      limit: 3,
      quality: 90,
    });

    const photos: Photo[] = [];

    for (const image of images.photos) {
      const file = await Filesystem.readFile({
        path: image.path,
      });

      photos.push({
        base64String: file.data,
        format: image.format,
        saved: true,
      });
    }

    return photos;
  }

}
