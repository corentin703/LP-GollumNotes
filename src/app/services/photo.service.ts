import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async takePhoto(): Promise<Photo> {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      // resultType: CameraResultType.Uri,
      // source: CameraSource.Camera,
      // quality: 100,
      // saveToGallery: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: false,
    });

    return capturedPhoto;
  }

  public async getBlobFromPhoto(photo: Photo): Promise<Blob> {
    return await fetch(photo.webPath).then(r => r.blob());
  }
}
