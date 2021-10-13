import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieOmdb } from './movie-omdb.interface';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private httpClient: HttpClient) { }

  getOmdbMovie(movieId: string): Observable<MovieOmdb>{
    const url: string = `${ environment.omdbUrl }?apiKey=${ environment.ombdApiKey }&i=${ movieId }`;
    return this.httpClient.get<MovieOmdb>(url);
  }
}




