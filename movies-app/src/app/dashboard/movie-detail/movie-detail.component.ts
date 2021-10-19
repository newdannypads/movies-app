import { MovieVideos } from './../movie-videos.interface';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cast } from '../credits.interface';
import { MovieOmdb } from '../movie-omdb.interface';
import { MovieTmdb } from '../movie-tmdb.interface';
import { OmdbService } from '../omdb.service';
import { TmdbService } from '../tmdb.service';
import { VideoItem } from '../movie-videos.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {
  movieOmdb: MovieOmdb;
  movieTmdb: MovieTmdb;
  castTmdb: Cast[];
  videosTmdb: VideoItem[];
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
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMoviesDetails();
    // //this.getWonAwards();
    // this.getWonOscars();
  }

  getMoviesDetails() {
    combineLatest([
      this.tmdbService.getTmdbMovie(this.movieId),
      this.tmdbService.getCastMovie(this.movieId),
      this.tmdbService.getTmdbVideoMovies(this.movieId)
    ])
      .pipe(
        switchMap((data) =>
          this.getOmdbMovie(data[0].imdb_id).pipe(
            map((movieOmdb: MovieOmdb) => ({
              movieTmdb: data[0],
              castTmdb: data[1],
              videosTmdb: data[2],
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

  private setData(movieTmdb: MovieTmdb, movieOmdb: MovieOmdb, videosTmdb: MovieVideos, castTmdb: Cast[]) {
    this.movieTmdb = movieTmdb;
    this.movieOmdb = movieOmdb;
    this.genres = movieTmdb.genres;
    this.videosTmdb = videosTmdb.results;
    this.castTmdb = castTmdb.filter((actor) => actor.profile_path !== null);
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
