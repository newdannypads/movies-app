import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SwiperOptions } from 'swiper';
import { Genre } from './movie-tmdb.interface';
import { Movie } from './movies-trending.interface';
import { TmdbService } from './tmdb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  movies$: Observable<Movie[]>;
  genres$: Observable<Genre[]>;
  config: SwiperOptions;
  imageHeight: string = '75vh';

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getMoviesGenre();
    this.configSwiper();
  }

  getTrendingMovies() {
    this.movies$ = this.tmdbService.getTmdbNowPlayingMovies().pipe(map(({ results }) => results));
  }

  getMoviesGenre() {
    this.genres$ = this.tmdbService.getTmdbGenreMovies().pipe(map(({ genres }) => genres));
  }

  configSwiper() {
    this.config = {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
  }
}
