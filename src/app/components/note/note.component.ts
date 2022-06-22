import {Component, OnInit, Input} from '@angular/core';
import {PhotoService} from '@app/services/photo.service';
import {Note} from '@app/entities/Note';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NoteStoreService} from '@app/services/stores/note-store.service';
import {Photo} from '@capacitor/camera';

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
  public popoverId: string;

  public pictures: Photo[] = [];

  constructor(
    private readonly noteStoreService: NoteStoreService,
    private readonly photoService: PhotoService,
  ) { }

  public get titleControl(): AbstractControl {
    return this.noteForm?.get('title');
  }

  public get contentControl(): AbstractControl {
    return this.noteForm?.get('content');
  }

  public ngOnInit() {
    this.popoverId = `photo-add-btn-${this.note.id}`;
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
  }

  public delete() {
    this.noteStoreService.delete(
      this.note.id
    ).subscribe(result => {
      if (result !== null && result.errors !== undefined){
        this.errors = result.errors;
        return;
      }
    });
  }

  public update() {
    this.isEditing = true;
  }

  public commitUpdate() {
    this.noteStoreService.update(
      this.note.id,
      this.noteForm.value
    ).subscribe(result => {
      if (result.errors !== undefined){
        this.errors = result.errors;
        return;
      }
      this.note.title = this.titleControl.value;
      this.note.content = this.contentControl.value;
      this.isEditing = false;
    });
  }

  public cancelUpdate() {
    this.titleControl.setValue(this.note.title);
    this.contentControl.setValue(this.note.content);
    this.isEditing = false;
  }

  public addPicture() {
    console.log('note title : ' + this.note.title );
    console.log('note content : ' + this.note.content );
  }

  public takePicture() {
    console.log('LA NOTE ' + this.note.title);
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
        this.pictures.push(value);
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
  test() {
    console.log('Test :');
    console.log('note titile : ' + this.note.title);
    console.log('note content : ' + this.note.content);
  }
}
