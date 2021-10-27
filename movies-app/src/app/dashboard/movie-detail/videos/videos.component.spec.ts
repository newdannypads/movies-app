import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SanitizeUrlPipe } from '../../../shared/pipes/sanitize-url.pipe';
import * as videos from '../../../shared/tests/data/movie-videos.json';
import { VideosComponent } from './videos.component';


describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosComponent, SanitizeUrlPipe ],
      imports: [  NgxUsefulSwiperModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    component.videos = videos.movieVideo.results;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all videos url', () => {
    component.videosUrl = [];

    component.getUrlVideos();

    expect(component.videosUrl).toEqual(videos.movieVideoUrl);
  });
});
