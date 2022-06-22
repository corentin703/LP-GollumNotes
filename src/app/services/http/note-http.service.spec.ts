import { TestBed } from '@angular/core/testing';
import { NoteHttpService } from './note-http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Note} from '@app/entities/Note';
import {CreateNoteRequest, UpdateNoteRequest} from '@app/services/http/note-http.service.type';
import {faker} from '@faker-js/faker';
import {configServiceMock, fakeConfig} from '@/__mocks__/services/config-service-mock';
import {Payload} from '@app/services/http/common.type';
import {ConfigService} from '@app/services/config.service';
import {makeNote} from '@/__fixtures__/NoteFixture';

describe('NoteHttpService', () => {
  let httpTestingController: HttpTestingController;
  let noteHttpService: NoteHttpService;

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
      ]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    noteHttpService = TestBed.inject(NoteHttpService);
  });

  it('should be created', () => {
    expect(noteHttpService).toBeTruthy();
  });

  it('should get all', () => {
    let response: Payload<Note[]>;
    const responseBody: Payload<Note[]> = {
      data: notes,
    };

    noteHttpService.getAll().subscribe(response$ => response = response$);
    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes`);
    request.flush(responseBody);

    expect(response.data.length).toEqual(responseBody.data.length);
  });

  it('should get by id', () => {
    let response: Payload<Note>;
    const responseBody: Payload<Note> = {
      data: note,
    };

    noteHttpService.getById(note.id).subscribe(response$ => response = response$);
    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes/${note.id}`);
    request.flush(responseBody);

    expect(response.data.id).toEqual(responseBody.data.id);
    for(const property in responseBody.data) {
      if (Object.prototype.hasOwnProperty.call(responseBody.data, property)) {
        expect(response.data[property]).toEqual(responseBody.data[property]);
      }
    }
  });

  it('should request note creation', () => {
    const requestBody: CreateNoteRequest = {
      title: note.title,
      content: note.content,
    };

    const responseBody: Payload<Note> = {
      data: note,
    };

    let newNote: Note;

    noteHttpService.create(requestBody).subscribe(response => {
      newNote = response?.data;
    });

    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes`);
    request.flush(responseBody);

    expect(newNote).toBeDefined();
    for(const property in note) {
      if (Object.prototype.hasOwnProperty.call(note, property)) {
        expect(newNote[property]).toEqual(note[property]);
      }
    }
  });

  it('should request note update', () => {
    const requestBody: UpdateNoteRequest = {
      content: updatedNoteContent,
    };

    let responseBody: any;

    noteHttpService.update(note.id, requestBody).subscribe(response => {
      responseBody = response;
    });

    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes/${note.id}`);
    request.flush(null, {
      status: 204,
      statusText: 'NO-CONTENT'
    });

    expect(responseBody).toBeNull();
  });

  it('should request note update with error', () => {
    const requestBody: UpdateNoteRequest = {
      content: updatedNoteContent,
    };

    let responseBody: Payload<undefined>;
    const errorResponseBody: Payload<undefined> = {
      errors: [
        faker.lorem.lines(1),
      ],
    };

    noteHttpService.update(note.id, requestBody)
      .subscribe(response => responseBody = response);

    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes/${note.id}`);
    request.flush(errorResponseBody, {
      status: 400,
      statusText: 'BAD-REQUEST'
    });

    expect(responseBody).toBeDefined();
    expect(responseBody.errors).toBeDefined();
    expect(responseBody.errors.length).toEqual(errorResponseBody.errors.length);
    expect(responseBody.errors[0]).toEqual(errorResponseBody.errors[0]);
  });

  it('should request note deletion', () => {
    let responseBody: any;

    noteHttpService.delete(note.id).subscribe(response => {
      responseBody = response;
    });

    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes/${note.id}`);
    request.flush(null, {
      status: 204,
      statusText: 'NO-CONTENT'
    });

    expect(responseBody).toBeNull();
  });
});
