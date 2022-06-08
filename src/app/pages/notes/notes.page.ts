import { Component, OnInit } from '@angular/core';

import {Note } from '../../@entities/Note';
import {Profile,createProfile } from '../../@entities/Profile';
import {createNote} from '../../@entities/Note';
import {NoteService} from '../../services/http/note.service';
import {AccountService} from '../../services/http/account.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  // noteCrudService: NoteCrudService = new NoteCrudService()
  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private accountService: AccountService,

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

    // this.accountService.login('identifiant2Profile', 'passwordProfile').subscribe(
    //   loginRes => {
    //     console.log('retour login', loginRes);
    //   }
    // );

    // this.accountService.register('identifiant2Profile', 'passwordProfile').subscribe(
    //   result => {
    //     console.log('retour register', result);
    //
    //
    //   }
    // );
  }

}
