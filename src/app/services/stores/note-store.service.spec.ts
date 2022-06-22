import { TestBed } from '@angular/core/testing';

import { NoteStoreService } from './note-store.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Note} from '@app/entities/Note';
import {configServiceMock, fakeConfig} from '@/__mocks__/services/config-service-mock';
import {ConfigService} from '@app/services/config.service';
import {makeNote} from '@/__fixtures__/NoteFixture';
import {faker} from '@faker-js/faker';
import {Payload} from '@app/services/http/common.type';
import {CreateNoteRequest} from '@app/services/http/note-http.service.type';
import {NoteHttpService} from '@app/services/http/note-http.service';
import {NoteHttpServiceMock} from '@/__mocks__/services/http/note-http-service-mock';

describe('NoteStoreService', () => {
  let noteStoreService: NoteStoreService;
  let httpTestingController: HttpTestingController;

  const note = makeNote();
  const notes = [
    note,
    makeNote(),
    makeNote(),
  ];

  const updatedNoteContent = faker.lorem.text();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ConfigService, useValue: configServiceMock},
        {provide: NoteHttpService, useValue: new NoteHttpServiceMock(configServiceMock, notes)},
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    noteStoreService = TestBed.inject(NoteStoreService);
  });

  it('should be created', () => {
    expect(noteStoreService).toBeTruthy();
  });

  it('should get all', () => {
    let gotNotes: Note[];
    noteStoreService.getAll().subscribe(notes$ => gotNotes = notes$);
    expect(gotNotes.length).toEqual(notes.length);
  });

  it('should get by id', () => {
    let gotNote: Note;
    noteStoreService.getAll();
    noteStoreService.getById(note.id).subscribe(note$ => gotNote = note$);

    for(const property in note) {
      if (Object.prototype.hasOwnProperty.call(note, property)) {
        expect(gotNote[property]).toEqual(note[property]);
      }
    }
  });

  it('should create new', () => {
    const newNote = makeNote();

    const model: CreateNoteRequest = {
      title: newNote.title,
      content: newNote.content,
    };

    let response: Payload<Note>;
    noteStoreService.getAll();
    noteStoreService.create(model).subscribe(response$ => response = response$);

    for(const property in model) {
      if (Object.prototype.hasOwnProperty.call(model, property)) {
        expect(response.data[property]).toEqual(model[property]);
      }
    }
  });

  it('should update', () => {
    let gotNote: Note;
    noteStoreService.getAll();
    noteStoreService.getById(note.id).subscribe(note$ => gotNote = note$);

    for(const property in note) {
      if (Object.prototype.hasOwnProperty.call(note, property)) {
        expect(gotNote[property]).toEqual(note[property]);
      }
    }
  });

});
