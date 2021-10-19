import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import * as movie from '../shared/tests/data/movie-data.testdata.json';
import * as moviesGenres from '../shared/tests/data/movie-genres-data.testdata.json';
import * as movies from '../shared/tests/data/movie-now-playin-data.testdata.json';
import * as movieVideos from '../shared/tests/data/movie-videos.json';
import * as popularSeries from '../shared/tests/data/popular-series-data.testdata.json';
import * as movieCast from '../shared/tests/data/movie-cast.json';
import { environment } from './../../environments/environment';
import { TmdbService } from './tmdb.service';


describe('TmdbService', () => {
  let service: TmdbService;
  let httpTestingController: HttpTestingController;
  const movieId: string = 'ABC123';
  const params =  `?api_key=${ environment.tmbdApiKey }&page=1`


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
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }${ params }`;

    service.getTmdbMovie( movieId ).subscribe( (data) => {
      expect(data).toEqual(movie.movieTmdb);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movie.movieTmdb);
  });

  it('should call the trending movies in tmdb', () => {
    const url: string = `${ environment.tmdbUrl }movie/now_playing${ params }`;
    service.getTmdbNowPlayingMovies().subscribe( (data) => {
      expect(data).toEqual(movies.moviesNowPlayingData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movies.moviesNowPlayingData);
  });

  it('should call all movies genres in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }genre/movie/list${ params }`;

    service.getTmdbGenreMovies().subscribe( (data) => {
      expect(data).toEqual(moviesGenres.moviesGenresData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

  it('should call all movies genres in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }genre/movie/list${ params }`;

    service.getTmdbGenreMovies().subscribe( (data) => {
      expect(data).toEqual(moviesGenres.moviesGenresData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movieVideos);
  });

  it('should get all videos related with the movie', () => {

    const url: string = `${ environment.tmdbUrl }movie/${ movieId }/videos${ params }`;

    service.getTmdbVideoMovies(movieId).subscribe( (data) => {
      expect(data).toEqual(moviesGenres.moviesGenresData);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

  it('should get all movie cast', () => {

    const url: string = `${ environment.tmdbUrl }/movie/${ movieId }/credits${ params }`;

    service.getCastMovie(movieId).subscribe( (data) => {
      expect(data).toEqual(movieCast.credits.cast);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(movieCast.credits.cast);
  });

  it('should call popular series in tmdb', () => {

    const url: string = `${ environment.tmdbUrl }tv/popular${ params }`;

    service.getTmdbPopularSeries().subscribe( (data) => {
      expect(data).toEqual(popularSeries.popularSeries);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

  it('should call tv series by Id in tmdb', () => {

    const tvId = 'ABC123';
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }${ params }`;

    service.getTmdbTvSeries(tvId).subscribe( (data) => {
      expect(data).toEqual(popularSeries.popularSeries[0]);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });


  it('should call cast tv series by Id in tmdb', () => {

    const tvId = 'ABC123';
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }/credits${ params }`;

    service.getTmdbCastTvSeries(tvId).subscribe( (data) => {
      expect(data).toEqual(popularSeries.popularSeries[0]);
    });

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(moviesGenres.moviesGenresData);
  });

});
