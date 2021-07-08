import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private httpClient: HttpClient) { }

  getTmdbMovie( movieId: string ): Observable<any>{
    const url: string = `${ environment.tmdbUrl }movie/${ movieId }?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get(url);
  }

  getTmdbTrendingMovies( ): Observable<any>{
    const url: string = `${ environment.tmdbUrl }trending/all/day?api_key=${ environment.tmbdApiKey }`;
    return this.httpClient.get(url);
  }
}
