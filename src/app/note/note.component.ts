import { Component, OnInit, Input } from '@angular/core';
import {Note} from '../services/http/note.service.type';
import {NoteService} from '../services/http/note.service';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import {imageSourceToPath} from 'cordova-res/dist/platform';
// import {Note } from '../@entities/Note';
// import {createNote } from '../@entities/Note';
////
//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CustomComponent } from './custom.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  @Input() note: Note;

  id;
  title;
  content;
  editableTitle = false;
  editableContent = false;
  ishiddenUpdateButton = false;
  ishiddenCommitUpdateButton = true;



  constructor(
    private readonly noteService: NoteService,
    // private photoLibrary: PhotoLibrary,
    private camera: Camera
  ) {
  // this.note = createNote("idstring", "descriptionstring")


 }

  ngOnInit() {
    this.id = this.note.id;
    this.title = this.note.title;
    this.content = this.note.content;
    console.log(this.note.id);
    // content =""
  }


  deleteNote() {
    this.noteService.delete(
      this.id
    ).subscribe(result => {
      console.log('Note supprimée', result);
    });
  }

  updateNote() {
    this.editableTitle=true;
    this.editableContent=true;
    this.ishiddenUpdateButton=true;
    this.ishiddenCommitUpdateButton=false;
  }

  commitUpdateNote() {
    this.noteService.update(
      this.id,
      {
        title: this.title,
        content: this.content,
      }
    ).subscribe(result => {
      console.log('Note mise à jour', result);
    });
    this.editableTitle=false;
    this.editableContent=false;
    this.ishiddenUpdateButton=false;
    this.ishiddenCommitUpdateButton=true;
  }

  addPicture() {
    // this.photoLibrary.requestAuthorization().then(() => {
    //   this.photoLibrary.getLibrary().subscribe({
    //     next: library => {
    //       // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    //       library.forEach(function(libraryItem) {
    //         console.log(libraryItem.id);          // ID of the photo
    //         console.log(libraryItem.photoURL);    // Cross-platform access to photo
    //         console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
    //         console.log(libraryItem.fileName);
    //         console.log(libraryItem.width);
    //         console.log(libraryItem.height);
    //         console.log(libraryItem.creationDate);
    //         console.log(libraryItem.latitude);
    //         console.log(libraryItem.longitude);
    //         console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
    //       });
    //     },
    //     error: err => { console.log('could not get photos'); },
    //     complete: () => { console.log('done getting photos'); }
    //   });
    // })
    //   .catch(err => console.log('permissions weren\'t granted'));
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}
