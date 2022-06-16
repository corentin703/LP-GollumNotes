import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NoteStoreService} from '@app/services/stores/note-store.service';
import {Note} from '@app/entities/Note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  @Output() public noteAdded = new EventEmitter<Note>();

  public noteForm: FormGroup;

  private title$: string;
  private content$: string;

  constructor(private noteStoreService: NoteStoreService) { }

  public ngOnInit() {
    this.noteForm = new FormGroup({
      title: new FormControl(this.title$, [
        Validators.required,
        Validators.minLength(1)
      ]),
      content: new FormControl(this.content$, [
        Validators.required,
        Validators.minLength(1)
      ]),
    });
  }

  public commitAdd() {
    this.noteStoreService
      .create(this.noteForm.value)
      .subscribe(result => {
        console.log('Note créée', result);

        if (result.data !== null) {
          this.noteAdded.emit(result.data);
        }
      });
  }
}
