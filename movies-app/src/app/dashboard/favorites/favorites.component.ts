import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { MovieTmdb } from '../movie-tmdb.interface';
import { Movie } from '../movies-trending.interface';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(private tmdbService: TmdbService) {}

  favoritesList: Movie[] = [];
  config: SwiperOptions;
  imageHeight: string = '75vh';

  ngOnInit(): void {
    this.getFavoritesMovies();
    this.configSwiper();
  }

  configSwiper() {
    this.config = {
      loop: false,
      slidesPerView: 4,
      spaceBetween: 15,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
  }

  getFavoritesMovies() {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    const observable = {};

    favoritesLocalStorage.forEach(({ id }, i: number) => {
      observable['request' + i] = this.tmdbService.getTmdbMovie(id);
    });

    forkJoin(observable).subscribe(
      (result: MovieTmdb) => {
        Object.keys(result).forEach(key => {
          this.favoritesList.push(this.getMovieData(result, key));
        });
      }
    );
  }

  private getMovieData(result: MovieTmdb, key: string): Movie {
    return {
      id: result[key].id,
      title: result[key].title,
      vote_average: result[key].vote_average,
      overview: result[key].overview,
      poster_path: result[key].poster_path,
    };
  }
}
