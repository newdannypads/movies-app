import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { MovieTmdb } from '../movie-tmdb.interface';
import { Movie } from '../movies-trending.interface';
import { TmdbService } from '../tmdb.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(private tmdbService: TmdbService) {}

  favoritesList$: Observable<Movie[]>;
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

    this.favoritesList$ = forkJoin(observable).pipe(
      map((result: MovieTmdb) => this.addFavorites(result))
    );
  }

  private addFavorites(result: MovieTmdb) {
    let favoritesList: Movie[] = [];
    Object.keys(result).forEach(key => {
      favoritesList.push(this.getMovieData(result, key));
    });
    return favoritesList;
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
