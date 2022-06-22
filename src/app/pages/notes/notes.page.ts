import {Component, OnInit, Optional} from '@angular/core';
import {NoteHttpService} from '@app/services/http/note-http.service';
import {AccountHttpService} from '@app/services/http/account-http.service';
import {Photo} from '@capacitor/camera';
import {Note} from '@app/entities/Note';
import {IonRouterOutlet} from '@ionic/angular';
import {NoteStoreService} from '@app/services/stores/note-store.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  public notes: Note[] = [];

  constructor(
    private noteStore: NoteStoreService,
    @Optional() public routerOutlet: IonRouterOutlet,
  ) { }

  public ngOnInit() {
    this.noteStore.getAll().subscribe(
      notes => {
        this.notes = notes;
      });
  }
}
