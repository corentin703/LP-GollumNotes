import { Component, OnInit } from '@angular/core';

import {Note } from '../@entities/Note';
import {Profile,createProfile } from '../@entities/Profile';
import {createNote } from '../@entities/Note';
import {NoteCrudService } from '../services/note-crud.service';
import {UserCrudService } from '../services/user-crud.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  // noteCrudService: NoteCrudService = new NoteCrudService()
  notes : Note[] = []

    constructor(
      private noteCrudService: NoteCrudService,
      private userCrudService: UserCrudService,

      ) {

    // noteCrudService
    //   .getNotes()
    //   .subscribe(notes => this.notes = notes)


    // let note = createNote("idstring", "descriptionstring")
    // this.notes.push(note)

    // console.log(note.Description)
    }



    ngOnInit() {
    }

    ionViewDidEnter() {
      // this.noteCrudService.getNotes().subscribe((response) => {
      //   this.notes = response;
      // })

      console.log("retour register" + this.userCrudService.registerUser(
        createProfile("identifiant2Profile", "passwordProfile")).toString())

    }


}
