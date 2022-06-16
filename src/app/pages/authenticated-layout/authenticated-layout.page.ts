import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.page.html',
  styleUrls: ['./authenticated-layout.page.scss'],
})
export class AuthenticatedLayoutPage implements OnInit {

  public appPages = [
    { title: 'Notes', url: '/notes', icon: 'home' },
    { title: 'Rappels', url: '/notes/rappels', icon: 'bulb' },
    { title: 'Archive', url: '/notes/archive', icon:'archive' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
