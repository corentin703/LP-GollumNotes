import { Component, OnInit } from '@angular/core';
import {PhotoService} from '@app/services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public photoService: PhotoService
  ) { }

  ngOnInit() {
  }

  addPhotoToGallery() {
    this.photoService.takePhoto();
  }
}
