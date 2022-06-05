import { Component, OnInit } from '@angular/core';

// import {Note } from '../@entities/Note';
import {Profile,createProfile } from '../@entities/Profile';
import {createNote} from '../@entities/Note';
import {NoteService} from '../services/http/note.service';
import {AccountService} from '../services/http/account.service';
import {Note, CreateNoteRequest} from '../services/http/note.service.type';

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

    // let newNote: CreateNoteRequest = { title: "titileTest", content: "contentTest" };


    this.accountService.login('identifiant2Profile', 'passwordProfile').subscribe(
      loginRes => {
        console.log('retour login', loginRes);
      }
    );

    // this.noteService.create(newNote).subscribe(
    //   createRes => {
    //     console.log('retour addNote', createRes);
    //   }
    // );

    this.noteService.getAll().subscribe(
      getAllRes => {
        console.log('retour getAllNote', getAllRes);
        console.log('retour getAllNote', getAllRes.data);

        getAllRes.data.forEach(element => {
          let note: Note = {
            id: element.id,
            title: element.title,
            content: element.content,
            createdAt: element.createdAt,
            lastModifiedAt: element.lastModifiedAt,
            pictures: element.pictures
          }
          this.notes.push(note);
          

          console.log("title " + element.title);

          // this.notes.push(element as Note)
        });
        // this.notes = getAllRes.data as Note[]
      }
    );

    console.log("nb notes " + this.notes.length);


    // this.accountService.register('identifiant2Profile', 'passwordProfile').subscribe(
    //   result => {
    //     console.log('retour register', result);
    //
    //
    //   }
    // );
  }

}
