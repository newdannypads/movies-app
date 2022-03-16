import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cast } from '../credits.interface';
import { MovieOmdb } from '../movie-omdb.interface';
import { MovieTmdb } from '../movie-tmdb.interface';
import { VideoItem } from '../movie-videos.interface';
import { OmdbService } from '../omdb.service';
import { TmdbService } from '../tmdb.service';
import { MovieVideos } from './../movie-videos.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movieOmdb: MovieOmdb;
  movieTmdb: MovieTmdb;
  castTmdb: Cast[];
  videosTmdb: VideoItem[];

  stopSubscribe$: Subject<void> = new Subject<void>();

  favorite: boolean = false;
  movieId: string;
  genres = [];

  oscars;
  wonAwards;
  otherAwards: string;

  constructor(
    private tmdbService: TmdbService,
    private omdbService: OmdbService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    const { movieSelected } = this.getFavorites();
    this.favorite = movieSelected ? true : false;
    this.getMoviesDetails();
  }

  ngOnDestroy(): void {
    this.stopSubscribe$.next();
    this.stopSubscribe$.complete();
  }

  getMoviesDetails() {
    combineLatest([
      this.tmdbService.getTmdbMovie(this.movieId),
      this.tmdbService.getCastMovie(this.movieId),
      this.tmdbService.getTmdbVideoMovies(this.movieId),
    ])
      .pipe(
        switchMap(([movieTmdb, castTmdb, videosTmdb]) =>
          this.getOmdbMovie(movieTmdb.imdb_id).pipe(
            map((movieOmdb: MovieOmdb) => ({
              movieTmdb,
              castTmdb,
              videosTmdb,
              movieOmdb,
            }))
          )
        )
      )
      .subscribe(({ movieTmdb, castTmdb, videosTmdb, movieOmdb }) => {
        this.setData(movieTmdb, movieOmdb, videosTmdb, castTmdb);
        this.changeDetectorRef.detectChanges();
      });
  }

  getOmdbMovie(imdbId: string) {
    return this.omdbService.getOmdbMovie(imdbId);
  }

  setFavorite() {
    const { selectedFavorites, movieSelected } = this.getFavorites();

    let newSelectedFavorites: { id: string }[] = [];
    if (movieSelected) {
      newSelectedFavorites = selectedFavorites.filter(favorite => favorite.id !== this.movieId);
    } else {
      selectedFavorites.push({ id: this.movieId });
      newSelectedFavorites = selectedFavorites;
    }
    localStorage.setItem('favorites', JSON.stringify(newSelectedFavorites));
    this.favorite = !this.favorite;
  }

  private getFavorites() {
    const selectedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieSelected = selectedFavorites.find(favorite => favorite.id === this.movieId);
    return { selectedFavorites, movieSelected };
  }

  private setData(movieTmdb: MovieTmdb, movieOmdb: MovieOmdb, videosTmdb: MovieVideos, castTmdb: Cast[]) {
    this.movieTmdb = movieTmdb;
    this.movieOmdb = movieOmdb;
    this.genres = movieTmdb.genres;
    this.videosTmdb = videosTmdb.results;
    this.castTmdb = castTmdb.filter(actor => actor.profile_path !== null);
  }
}
