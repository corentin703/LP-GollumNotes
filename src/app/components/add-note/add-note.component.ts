import { Component, OnInit  } from '@angular/core';
import {NoteService} from '@app/services/http/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  public title: string;
  public content: string;

  constructor(private noteService: NoteService) { }

  ngOnInit() {}

  addNewNote() {
    this.noteService.create({
      title: this.title,
      content: this.content,
    }).subscribe(result => {
      console.log('Note créée', result);
    });
  }
}
