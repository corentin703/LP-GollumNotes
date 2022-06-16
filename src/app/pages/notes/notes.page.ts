import {Component, OnInit} from '@angular/core';
import {NoteService} from '@app/services/http/note.service';
import {AccountService} from '@app/services/http/account.service';
import {Photo} from '@capacitor/camera';
import {Note} from '@app/entities/Note';
import {IonRouterOutlet} from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  public notes: Note[] = [];
  public isAddingModalOpened = false;

  constructor(
    private noteService: NoteService,
    public routerOutlet: IonRouterOutlet,
  ) { }

  public ngOnInit() {
    //
  }

  public ionViewDidEnter() {
    // this.noteCrudService.getNotes().subscribe((response) => {
    //   this.notes = response;
    // })

    // let newNote: CreateNoteRequest = { title: "titileTest", content: "contentTest" };

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
          const note: {
            id: string;
            content: string;
            title: string;
            createdAt: Date;
            lastModifiedAt: Date;
            pictures: Photo[];
          } = {
            id: element.id,
            content: element.content,
            title: element.title,
            createdAt: element.createdAt,
            lastModifiedAt: element.lastModifiedAt,
            pictures: element.pictures
          };
          this.notes.push(note);

          console.log('title ' + element.title);

          // this.notes.push(element as Note)
        });
        // this.notes = getAllRes.data as Note[]
      }
    );

    console.log('nb notes ' + this.notes.length);


    // this.accountService.register('identifiant2Profile', 'passwordProfile').subscribe(
    //   result => {
    //     console.log('retour register', result);
    //
    //
    //   }
    // );
  }
}
