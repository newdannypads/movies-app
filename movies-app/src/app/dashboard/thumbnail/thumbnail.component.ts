import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { environment } from '../../../environments/environment';
import { Movie } from '../movies-trending.interface';


@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {

  @Input() movies: Movie[] = [];
  config: SwiperOptions;

  constructor() { }


  ngOnInit(): void {
    this.configSwiper();
  }

  configSwiper(){
    this.config = {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    };
  }
}
