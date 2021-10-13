import { MovieVideos } from './../../movie-videos.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from '../../tmdb.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  @Input() movieId: string;
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  videosUrl = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.getMovieVideos();
  }

  getMovieVideos() {
    this.tmdbService
      .getTmdbVideoMovies(this.movieId)
      .subscribe((videos: MovieVideos) => {
        this.getUrlVideos(videos.results);
      });
  }

  getUrlVideos(videos) {
    videos.forEach((video) => {
      this.videosUrl.push(this.convertVideoObject(video));
    });
  }

  convertVideoObject({ name, key }) {
    return {
      video: `https://youtu.be/${key}`,
      title: name,
      alt: name,
    };
  }
}
