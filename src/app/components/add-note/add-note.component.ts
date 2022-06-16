import {Component, OnInit} from '@angular/core';
import {NoteHttpService} from '@app/services/http/note-http.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  public noteForm: FormGroup;

  private title$: string;
  private content$: string;

  constructor(private noteService: NoteHttpService) { }

  public get titleControl(): AbstractControl {
    return this.noteForm?.get('title');
  }

  public get contentControl(): AbstractControl {
    return this.noteForm?.get('content');
  }

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
    this.noteService
      .create(this.noteForm.value)
      .subscribe(result => {
        console.log('Note créée', result);
        // if (result.data !== undefined) {
        //   this.onNoteAdded(result.data);
        // }
      });
  }
}
