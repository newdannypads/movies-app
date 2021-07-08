import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private httpClient: HttpClient) { }

  getOmdbMovie(movieId: string): Observable<any>{
    const url: string = `${ environment.omdbUrl }?apiKey=${ environment.ombdApiKey }&i=${ movieId }`;
    return this.httpClient.get(url);
  }
}
