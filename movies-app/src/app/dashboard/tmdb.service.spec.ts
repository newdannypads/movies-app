import { environment } from './../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';

import { TmdbService } from './tmdb.service';
import * as movie from '../shared/tests/data/movie-data.testdata.json';
import * as moviesTrending from '../shared/tests/data/movie-trending-data.testdata.json';
import * as moviesGenres from '../shared/tests/data/movie-genres-data.testdata.json';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.inject(TmdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the detail movie in tmdb', () => {
    const movieId: string = 'ABC123';
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbMovie( movieId ).subscribe( (data) => {
      expect(data).toEqual(movie.movieTmdbData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movie.movieTmdbData);
  });

  it('should call the trending movies in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }trending/all/day?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbTrendingMovies().subscribe( (data) => {
      expect(data).toEqual(moviesTrending.moviesTrendingData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesTrending.moviesTrendingData);
  });

  it('should call all movies genres in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }genre/movie/list?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbGenreMovies().subscribe( (data) => {
      expect(data).toEqual(moviesGenres.moviesGenresData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

});
