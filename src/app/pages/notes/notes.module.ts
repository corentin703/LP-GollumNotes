import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';

import { NoteComponent } from '../../components/note/note.component';
import { AddNoteComponent } from '../../components/add-note/add-note.component';
import {
  AddNoteModalContentComponent
} from '@app/components/modals/add-note-modal-content/add-note-modal-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotesPage, NoteComponent, AddNoteComponent, AddNoteModalContentComponent]
})
export class NotesPageModule {}
