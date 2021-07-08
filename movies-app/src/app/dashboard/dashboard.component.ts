import { Component, OnInit } from '@angular/core';
import { TmdbService } from './tmdb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private tmdbService: TmdbService) { }

  movies = [];

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  getTrendingMovies(){
    this.tmdbService.getTmdbTrendingMovies().subscribe((data) => {
      this.movies = data.results;
    });
  }
}
