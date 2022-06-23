import {Component, OnInit, Input} from '@angular/core';
import {PhotoService} from '@app/services/photo.service';
import {Note} from '@app/entities/Note';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NoteStoreService} from '@app/services/stores/note-store.service';
import {PictureStoreService} from '@app/services/stores/picture-store.service';
import {Picture} from '@app/entities/Picture';

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

  constructor(
    private readonly noteStoreService: NoteStoreService,
    private readonly pictureStoreService: PictureStoreService,
    private readonly photoService: PhotoService,
  ) { }

  public get titleControl(): AbstractControl {
    return this.noteForm?.get('title');
  }

  public get contentControl(): AbstractControl {
    return this.noteForm?.get('content');
  }

  public get pictures(): Picture[] {
    return this.note.pictures.filter(picture => picture.base64 !== undefined);
  };

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
    const newPhotoTask = this.photoService.takePhoto();
    newPhotoTask
      .then(newPhoto =>
        this.pictureStoreService
          .create(this.note.id, newPhoto)
          .subscribe(response => console.log('Picture added'))
      );
  }
}
