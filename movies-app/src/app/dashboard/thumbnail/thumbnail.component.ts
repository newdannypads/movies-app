import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Movie } from '../movies-trending.interface';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Input() imageHeight: string;
  @Input() config: SwiperOptions;

  constructor() { }


  ngOnInit(): void {
  }


}
