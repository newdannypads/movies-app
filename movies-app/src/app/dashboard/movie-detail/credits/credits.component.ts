import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Cast } from '../../credits.interface';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {
  @Input() cast: Cast[];
  config: SwiperOptions;

  constructor() { }

  ngOnInit(): void {
    this.configSwiper();
  }

  configSwiper(){
    this.config = {
      slidesPerView: 10.3,
      freeMode: true,
      spaceBetween: 15
    };
  }
}
