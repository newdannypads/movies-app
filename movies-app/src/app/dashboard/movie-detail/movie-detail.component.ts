import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MovieOmdb } from '../movie-omdb.interface';
import { MovieTmdb } from '../movie-tmdb.interface';
import { OmdbService } from '../omdb.service';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {

  movieOmdb: MovieOmdb;
  movieTmdb: MovieTmdb;
  // awards = movieOmdbData.Awards;

  movieId: string;
  genres = [];

  oscars;
  wonAwards;
  otherAwards: string;

  constructor(
    private tmdbService: TmdbService,
    private omdbService: OmdbService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMoviesDetails();
    // //this.getWonAwards();
    // this.getWonOscars();
  }

  getMoviesDetails() {
    this.tmdbService
      .getTmdbMovie(this.movieId)
      .pipe(
        switchMap((movieTmdb: MovieTmdb) =>
        this.getOmdbMovie(movieTmdb.imdb_id).pipe(
          map((movieOmdb: MovieOmdb) => ({ movieTmdb, movieOmdb }))
        ))
      )
      .subscribe(({ movieTmdb, movieOmdb }) => {
        this.movieTmdb = movieTmdb;
        this.movieOmdb = movieOmdb;
        this.genres = movieTmdb.genres;
        this.changeDetectorRef.detectChanges();
      });
  }

  getOmdbMovie(imdbId: string) {
    return this.omdbService.getOmdbMovie(imdbId)
  }

  // getWonAwards() {
  //   this.wonAwards = this.awards.filter((award) => award.isWinner === true);
  // }

  // getWonOscars() {
  //   //this.oscars =
  //   this.awards.split('.').map(
  //     (award) => {
  //       if( award.includes('Oscar')){
  //         const numberOfOscars = +award.split(' ')[1];
  //         this.oscars = Array.from(Array(numberOfOscars).keys())
  //       }
  //     }
  //   );
  // }

}
