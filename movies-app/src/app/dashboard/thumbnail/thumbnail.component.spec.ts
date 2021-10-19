import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingModule } from 'ng-starrating';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import * as movies from '../../shared/tests/data/movie-now-playin-data.testdata.json';
import { ThumbnailComponent } from './thumbnail.component';
import { PosterPipe } from '../../shared/pipes/poster.pipe';


describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailComponent, PosterPipe ],
      imports: [RouterTestingModule, NgxUsefulSwiperModule, RatingModule],
      providers: [  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    component.movies = <any>movies.moviesNowPlayingData.results;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
