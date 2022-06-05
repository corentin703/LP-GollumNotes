import { Component, OnInit, Input } from '@angular/core';
import {Note} from '../services/http/note.service.type';
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

  @Input() note: Note

  title
  content

  constructor() {
  // this.note = createNote("idstring", "descriptionstring")


 }

  ngOnInit() {
    this.title = this.note.title
    this.content = this.note.content
    console.log(this.note.id)
    // content =""
  }


}
