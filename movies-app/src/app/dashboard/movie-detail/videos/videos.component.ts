import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { VideoItem } from '../../movie-videos.interface';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  @Input() videos: VideoItem[];

  videosUrl: { url: string, name: string }[] = [];
  config: SwiperOptions;

  constructor() {}

  ngOnInit(): void {
    this.getUrlVideos();
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

  getUrlVideos() {
    this.videos.forEach((video) => {
      this.videosUrl.push(this.convertVideoObject(video));
    });
  }

  convertVideoObject({ name, key }): { url: string, name: string } {
    return {
      url: `https://www.youtube.com/embed/${key}`,
      name
    };
  }
}
