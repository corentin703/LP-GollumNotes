import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-add-note-modal-content',
  templateUrl: './add-note-modal-content.component.html',
  styleUrls: ['./add-note-modal-content.component.scss'],
})
export class AddNoteModalContentComponent implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  public ngOnInit() {}

  public close() {
    this.modalController.dismiss();
  }
}
