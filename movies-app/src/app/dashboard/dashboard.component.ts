import { Component, OnInit } from '@angular/core';
import { TmdbService } from './tmdb.service';
import { Movie } from './movies-trending.interface';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  genres = [];
  imageHeight: string = '75vh';
  config: SwiperOptions;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getMoviesGenre();
    this.configSwiper();
  }

  getTrendingMovies() {
    this.tmdbService.getTmdbNowPlayingMovies().subscribe((data) => {
      this.movies = data.results;
    });
  }

  getMoviesGenre() {
    this.tmdbService.getTmdbGenreMovies().subscribe((data) => {
      this.genres = data.genres;
    });
  }

  configSwiper() {
    this.config = {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
  }
}
