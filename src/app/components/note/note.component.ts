import { Component, OnInit, Input } from '@angular/core';
import {Note } from '../../@entities/Note';
import {createNote } from '../../@entities/Note';
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

  constructor() {
  // this.note = createNote("idstring", "descriptionstring")
 }

  ngOnInit() {
    // console.log("test")
  }


}
