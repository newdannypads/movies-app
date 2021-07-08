import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { environment } from '../../environments/environment';

import { OmdbService } from './omdb.service';
import * as movie from '../shared/tests/data/movie-data.testdata.json';

describe('OmdbService', () => {
  let service: OmdbService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.inject(OmdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the detail of the movie in omdb', () => {
    const movieId: string = 'ABC123';
    const url: string = `${ environment.omdbUrl }?apiKey=${ environment.ombdApiKey }&i=${ movieId }`;

    service.getOmdbMovie( movieId ).subscribe( (data) => {
      expect(data).toEqual(movie.movieOmdb);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movie.movieOmdb);
  });
});
