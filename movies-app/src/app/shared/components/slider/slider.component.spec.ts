import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import * as movies from '../../tests/data/movie-now-playin-data.testdata.json';
import { SliderComponent } from './slider.component';
import { PosterPipe } from '../../pipes/poster.pipe';
import { NgRatingBarModule } from 'ng-rating-bar';
import { SwiperOptions } from 'swiper';


describe('ThumbnailComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  const config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row'
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderComponent, PosterPipe ],
      imports: [RouterTestingModule, NgxUsefulSwiperModule, NgRatingBarModule ],
      providers: [  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    component.movies = <any>movies.moviesNowPlayingData.results;
    component.config = config;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
