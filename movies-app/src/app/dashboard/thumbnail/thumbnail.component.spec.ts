import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import * as movies from '../../shared/tests/data/movie-now-playin-data.testdata.json';
import { ThumbnailComponent } from './thumbnail.component';
import { PosterPipe } from '../../shared/pipes/poster.pipe';
import { NgRatingBarModule } from 'ng-rating-bar';
import { SwiperOptions } from 'swiper';


describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;
  const config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row'
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailComponent, PosterPipe ],
      imports: [RouterTestingModule, NgxUsefulSwiperModule, NgRatingBarModule ],
      providers: [  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    component.movies = <any>movies.moviesNowPlayingData.results;
    component.config = config;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
