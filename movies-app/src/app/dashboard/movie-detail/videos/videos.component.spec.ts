import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgImageSliderModule } from 'ng-image-slider';
import { of } from 'rxjs';
import { TmdbService } from '../../tmdb.service';
import { VideosComponent } from './videos.component';
import * as videos from '../../../shared/tests/data/movie-videos.json';


describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;
  const movieId = 'ABC123'

  const mockTmdbService = {
    getTmdbVideoMovies: jest.fn(() => of())
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosComponent ],
      imports: [ NgImageSliderModule ],
      providers: [
        { provide : TmdbService, useValue: mockTmdbService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call all movie videos', () => {
    component.movieId = movieId;
    component.getMovieVideos();

    expect(mockTmdbService.getTmdbVideoMovies).toHaveBeenCalledWith(movieId);
  });

  it('should get all videos url', () => {
    const videosData = videos.movieVideo.results;
    component.getUrlVideos(videosData);

    expect(component.videosUrl).toEqual(videos.movieVideoUrl);
  });
});
