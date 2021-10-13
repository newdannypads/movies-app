import { Component, OnInit } from '@angular/core';
import { MovieTrending } from './movies-trending.interface';
import { TmdbService } from './tmdb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private tmdbService: TmdbService) { }

  movies: MovieTrending[] = [];
  genres = []

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getMoviesGenre();
  }

  getTrendingMovies(){
    this.tmdbService.getTmdbTrendingMovies()
    .subscribe((data) => {
      this.movies = data.results;
    });
  }

  getMoviesGenre(){
    this.tmdbService.getTmdbGenreMovies().subscribe((data) => {
      this.genres = data.genres;
    })
  }
}
