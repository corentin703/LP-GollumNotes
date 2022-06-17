import {Component, OnInit, Input} from '@angular/core';
import {PhotoService} from '@app/services/photo.service';
import {Camera} from '@ionic-native/camera/ngx';
import {Note} from '@app/entities/Note';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NoteStoreService} from '@app/services/stores/note-store.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  @Input() public note: Note;

  public noteForm: FormGroup;

  public isEditing = false;

  public errors: Array<string>;

  constructor(
    private readonly noteStoreService: NoteStoreService,
    private readonly photoService: PhotoService,
    private camera: Camera
  ) { }

  public get id(): string {
    return this.note.id;
  }

  public get title(): string {
    return this.note.title;
  }

  public get content(): string {
    return this.note.content;
  }

  public get createdAt(): Date {
    return this.note.createdAt;
  }

  public get titleControl(): AbstractControl {
    return this.noteForm?.get('title');
  }

  public get contentControl(): AbstractControl {
    return this.noteForm?.get('content');
  }

  public ngOnInit() {
    this.noteForm = new FormGroup({
      title: new FormControl(this.note.title, [
        Validators.required,
        Validators.minLength(1)
      ]),
      content: new FormControl(this.note.content, [
        Validators.required,
        Validators.minLength(1)
      ]),
    });

    console.log(this.note.id);
  }

  public delete() {
    this.noteStoreService.delete(
      this.id
    ).subscribe(result => {
      if (result.errors !== undefined){
        this.errors = result.errors;
        return;
      }
      console.log('Note supprimée', result);
    });
  }

  public update() {
    this.isEditing = true;
  }

  public commitUpdate() {
    this.noteStoreService.update(
      this.id,
      this.noteForm.value
    ).subscribe(result => {
      console.log('Start commit');
      if (result.errors !== undefined){
        this.errors = result.errors;
        return;
      }
      console.log('Note mise à jour', result);
      this.note.title = this.titleControl.value;
      this.note.content = this.contentControl.value;
      this.isEditing = false;
    });
  }

  public cancelUpdate() {
    this.titleControl.setValue(this.title);
    this.contentControl.setValue(this.content);
    this.isEditing = false;
  }

  public addPicture() {
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

  public takePicture() {

    const newPhoto = this.photoService.takePhoto();

    newPhoto.then(
      value => {
        console.log(
          'dataUrl ' + value.dataUrl
        + '\nformat '+ value.format
        + '\npath '+ value.path
        + '\nwebPath '+ value.webPath
        + '\nbase64String '+ value.base64String
        + '\nexif '+ value.exif
        + '\nsaved '+ value.saved
        );
        this.note.pictures.push(newPhoto);
      }
    );

    // console.log('new pic : ' + newPhoto.);
  }
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }
}
