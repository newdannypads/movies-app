import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieTmdb, Genres } from './movie-tmdb.interface';
import { MoviesTrending } from './movies-trending.interface';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private httpClient: HttpClient) { }

  getTmdbMovie( movieId: string ): Observable<MovieTmdb>{
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<MovieTmdb>(url);
  }

  getTmdbTrendingMovies( ): Observable<MoviesTrending>{
    const url: string = `${ environment.tmdbUrl }trending/all/day?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<MoviesTrending>(url);
  }

  getTmdbGenreMovies(): Observable<Genres>{
    const url: string = `${ environment.tmdbUrl }genre/movie/list?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get<Genres>(url);
  }
}
