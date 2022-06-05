import { Component, OnInit, ComponentFactory, ViewChild  } from '@angular/core';
import { NoteComponent } from '../../note/note.component';
import {NoteService} from "../../services/http/note.service";



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
