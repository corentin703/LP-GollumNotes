import { TestBed } from '@angular/core/testing';

import { PictureHttpService } from './picture-http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '@app/services/config.service';
import {configServiceMock, fakeConfig} from '@/__mocks__/services/config-service-mock';
import {Payload} from '@app/services/http/common.type';
import {Picture} from '@app/entities/Picture';
import {makeNote} from '@/__fixtures__/NoteFixture';
import {makePicture} from '@/__fixtures__/PictureFixture';

describe('PictureService', () => {
  let pictureHttpService: PictureHttpService;
  let httpTestingController: HttpTestingController;

  const note = makeNote();
  const picture = makePicture();
  const pictures = [
    picture,
    makePicture(),
    makePicture(),
    makePicture(),
    makePicture(),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ConfigService, useValue: configServiceMock},
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    pictureHttpService = TestBed.inject(PictureHttpService);
  });

  it('should be created', () => {
    expect(pictureHttpService).toBeTruthy();
  });

  it('should get all', () => {
    let response: Payload<Picture[]>;
    const responseBody: Payload<Picture[]> = {
      data: pictures,
    };

    pictureHttpService.getAll(note.id).subscribe(response$ => response = response$);
    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes/${note.id}/pictures`);
    request.flush(responseBody);

    expect(response.data.length).toEqual(responseBody.data.length);
  });

  it('should get by id', () => {
    let response: Payload<Picture>;
    const responseBody: Payload<Picture> = {
      data: picture,
    };

    pictureHttpService.getById(note.id, picture.id).subscribe(response$ => response = response$);
    const request = httpTestingController.expectOne(`${fakeConfig.webService.url}/notes/${note.id}/pictures/${picture.id}`);
    request.flush(responseBody);

    expect(response.data.id).toEqual(responseBody.data.id);
    for(const property in responseBody.data) {
      if (Object.prototype.hasOwnProperty.call(responseBody.data, property)) {
        expect(response.data[property]).toEqual(responseBody.data[property]);
      }
    }
  });
});
