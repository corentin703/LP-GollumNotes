import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';

import { NoteComponent } from '../../components/note/note.component';
import { AddNoteComponent } from '../../components/add-note/add-note.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesPageRoutingModule
  ],
  declarations: [NotesPage, NoteComponent, AddNoteComponent]
})
export class NotesPageModule {}
