import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {

  @Input() movie;
  posterPath: string;

  constructor() { }

  ngOnInit(): void {
    this.posterPath = `${ environment.tmdbImage }w500${ this.movie.poster_path }`;
  }

}
