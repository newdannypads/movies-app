import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { movieOmdbData, movieTmdbData, movieVideos } from './movie.data';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  movieOmdb = movieOmdbData;
  movieTmdb = movieTmdbData;
  awards = movieOmdbData.Awards;
  videos = movieVideos.results;

  videosUrl = [];
  genres = [];


  oscars;
  wonAwards;
  otherAwards: string;

  constructor() {}

  ngOnInit(): void {
    //this.getWonAwards();
    this.getWonOscars();
    this.getIdVideos();
    this.getGenres();
  }

  // getWonAwards() {
  //   this.wonAwards = this.awards.filter((award) => award.isWinner === true);
  // }

  getWonOscars() {
    //this.oscars =
    this.awards.split('.').map(
      (award) => {
        if( award.includes('Oscar')){
          const numberOfOscars = +award.split(' ')[1];
          this.oscars = Array.from(Array(numberOfOscars).keys())
        }
      }
    );
  }

  getGenres(){
    this.movieTmdb.genres.map( genre => {
      this.genres.push(genre.name);
    });
  }

  getIdVideos() {
    this.videos.map((video) => {
      this.videosUrl.push( this.convertVideoObject(video))
    });
  }

  convertVideoObject(video ){
    const test = {
      video: `https://youtu.be/${ video.key }`,
      title: video.name,
      alt: video.name
    }
    return test;
  }
}
