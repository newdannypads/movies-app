import { Component, OnInit } from '@angular/core';
import { TmdbService } from './tmdb.service';
import { Movie } from './movies-trending.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  movies: Movie[] = [];
  genres = []

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getMoviesGenre();
  }

  getTrendingMovies(){
    this.tmdbService.getTmdbNowPlayingMovies()
    .subscribe((data) => {
      this.movies = data.results;
    });
  }

  getMoviesGenre(){
    this.tmdbService.getTmdbGenreMovies().subscribe((data) => {
      this.genres = data.genres;
    });
  }


}
