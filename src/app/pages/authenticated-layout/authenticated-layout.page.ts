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
    // { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
