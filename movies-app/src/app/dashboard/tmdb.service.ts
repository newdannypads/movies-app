import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Genres, MovieTmdb } from './movie-tmdb.interface';
import { MovieVideos } from './movie-videos.interface';
import { Movie, NowPlaying } from './movies-trending.interface';
import { Cast, Credits } from './credits.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private carteleraPage = 1;

  constructor(private httpClient: HttpClient) { }

  get params() {
    return {
      api_key:  environment.tmbdApiKey,
      page: this.carteleraPage.toString()
    }
  }

  getTmdbMovie( movieId: string ): Observable<MovieTmdb>{
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }`;
    return this.httpClient.get<MovieTmdb>(url, {  params: this.params });
  }

  getTmdbNowPlayingMovies( ): Observable<NowPlaying>{
    const url: string = `${ environment.tmdbUrl }movie/now_playing`;
    return this.httpClient.get<NowPlaying>(url, {  params: this.params })
  }

  getTmdbGenreMovies(): Observable<Genres>{
    const url: string = `${ environment.tmdbUrl }genre/movie/list`;
    return this.httpClient.get<Genres>(url, {  params: this.params });
  }

  getTmdbVideoMovies(movieId: string): Observable<MovieVideos>{
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }/videos`;
    return this.httpClient.get<MovieVideos>(url, {  params: this.params });
  }

  getCastMovie(movieId: string): Observable<Cast[]> {
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }/credits`;
    return this.httpClient.get<Credits>(url, { params: this.params })
    .pipe(
      map( resp => resp.cast ),
    )
  }

  searchMovie(query: string): Observable<Movie[]>{
    const url: string = `${ environment.tmdbUrl }search/movie?query=${ query }`;
    return this.httpClient.get<NowPlaying>(url, {
      params: this.params
    }).pipe(
      map( resp => resp.results )
    )
  }

  getTmdbPopularSeries(){
    const url: string = `${ environment.tmdbUrl }tv/popular`;
    return this.httpClient.get<Genres>(url, {  params: this.params });
  }

  getTmdbTvSeries(tvId: string) {
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }`;
    return this.httpClient.get<Genres>(url, {  params: this.params });
  }

  getTmdbCastTvSeries(tvId: string) {
    const url: string = `${ environment.tmdbUrl }tv/${ tvId }/credits`;
    return this.httpClient.get<Genres>(url, {  params: this.params });
  }
}
