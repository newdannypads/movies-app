import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movies-trending.interface';
import { TmdbService } from '../tmdb.service';
import { SwiperOptions } from 'swiper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query: string;
  movies$: Observable<Movie[]>;
  imageHeight: string = '40vh';
  config: SwiperOptions;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.paramMap.get('query');
    this.searchMovies();
    this.configSwiper();
  }

  searchMovies() {
    this.movies$ = this.tmdbService.searchMovie(this.query).pipe(map(({ results }) => results));
  }

  configSwiper() {
    this.config = {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
    };
  }
}
