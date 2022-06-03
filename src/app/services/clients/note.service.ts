import { Injectable } from '@angular/core';
import {Config} from "../config.service.type";
import {ConfigService} from "../config.service";
import {HttpClient} from "@angular/common/http";
import {Note} from "./note.service.type";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private config: Config | null;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
  ) {
    configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }

  public getAll() {
    return this.httpClient.get<Note[]>(`${this.config.webService.url}/notes`);
  }
}
