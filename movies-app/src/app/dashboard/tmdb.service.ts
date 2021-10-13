import { MovieVideos } from './movie-videos.interface';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieTmdb, Genres } from './movie-tmdb.interface';
import { MoviesTrending, MovieTrending } from './movies-trending.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private httpClient: HttpClient) { }

  getTmdbMovie( movieId: string ): Observable<MovieTmdb>{
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<MovieTmdb>(url);
  }

  getTmdbTrendingMovies( ): Observable<MovieTrending[]>{
    const url: string = `${ environment.tmdbUrl }trending/all/day?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<MoviesTrending>(url).pipe(
      map(data => data.results.filter((movie) => movie.media_type === 'movie'))
    );
  }

  getTmdbGenreMovies(): Observable<Genres>{
    const url: string = `${ environment.tmdbUrl }genre/movie/list?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<Genres>(url);
  }

  getTmdbVideoMovies(movieId: string): Observable<MovieVideos>{
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }/videos?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<MovieVideos>(url);
  }

  getTmdbPopularSeries(){
    const url: string = `${ environment.tmdbUrl }tv/popular?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<Genres>(url);
  }

  getTmdbTvSeries(tvId: string) {
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<Genres>(url);
  }

  getTmdbCastTvSeries(tvId: string) {
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }/credits?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<Genres>(url);
  }
}
