import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Movie } from '../../../dashboard/movies-trending.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Input() imageHeight: string;
  @Input() config: SwiperOptions;

  constructor() { }


  ngOnInit(): void {
  }


}
