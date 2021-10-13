import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import * as movie from '../shared/tests/data/movie-data.testdata.json';
import * as moviesGenres from '../shared/tests/data/movie-genres-data.testdata.json';
import * as moviesTrending from '../shared/tests/data/movie-trending-data.testdata.json';
import * as popularSeries from '../shared/tests/data/popular-series-data.testdata.json';
import * as movieVideos from '../shared/tests/data/movie-videos.json';
import { environment } from './../../environments/environment';
import { MovieTrending } from './movies-trending.interface';
import { TmdbService } from './tmdb.service';


describe('TmdbService', () => {
  let service: TmdbService;
  let httpTestingController: HttpTestingController;
  const movieId: string = 'ABC123';

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
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbMovie( movieId ).subscribe( (data) => {
      expect(data).toEqual(movie.movieTmdb);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movie.movieTmdb);
  });

  it('should call the trending movies in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }trending/all/day?api_key=${ environment.tmbdApiKey }`;

    const results = moviesTrending.moviesTrendingData.results;
    service.getTmdbTrendingMovies().subscribe( (data) => {
      expect(data).toEqual(<MovieTrending[]>results);
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

  it('should call all movies genres in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }genre/movie/list?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbGenreMovies().subscribe( (data) => {
      expect(data).toEqual(moviesGenres.moviesGenresData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movieVideos);
  });

  it('should call get all videos related with the movie', () => {

    const url: string = `${ environment.tmdbUrl }movie/${ movieId }/videos?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbVideoMovies(movieId).subscribe( (data) => {
      expect(data).toEqual(moviesGenres.moviesGenresData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

  it('should call popular series in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }tv/popular?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbPopularSeries().subscribe( (data) => {
      expect(data).toEqual(popularSeries.popularSeries);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

  it('should call tv series by Id in tmdb', () => {

    const tvId = 'ABC123';
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbTvSeries(tvId).subscribe( (data) => {
      expect(data).toEqual(popularSeries.popularSeries[0]);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });


  it('should call cast tv series by Id in tmdb', () => {

    const tvId = 'ABC123';
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }/credits?api_key=${ environment.tmbdApiKey }`;

    service.getTmdbCastTvSeries(tvId).subscribe( (data) => {
      expect(data).toEqual(popularSeries.popularSeries[0]);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

});
