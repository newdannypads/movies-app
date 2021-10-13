import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import * as movieTestData from '../../shared/tests/data/movie-data.testdata.json';
import { OmdbService } from '../omdb.service';
import { TmdbService } from '../tmdb.service';
import { AccordionComponent } from './accordion/accordion.component';
import { MovieDetailComponent } from './movie-detail.component';
import { VideosComponent } from './videos/videos.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;


  const mockTmdbService = {
    getTmdbMovie: jest.fn(() => of(movieTestData.movieTmdb))
  }

  const mockOmdbService = {
    getOmdbMovie: jest.fn(() => of(movieTestData.movieOmdb))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent, MockComponents(AccordionComponent, VideosComponent) ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide : TmdbService, useValue: mockTmdbService },
        { provide : OmdbService, useValue: mockOmdbService },
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call TmdbMovie', () => {
    const movieId =  'movieId';
    component.movieId = 'movieId';

    component.getMoviesDetails();

    expect(mockTmdbService.getTmdbMovie).toHaveBeenCalledWith(movieId);
  });

  it('should call omdbMovie with tmdbId', fakeAsync(() => {
    component.getMoviesDetails();
    tick();

    expect(mockOmdbService.getOmdbMovie).toHaveBeenCalledWith(movieTestData.movieTmdb.imdb_id);
  }));

  it('should set the correct values', () => {
    component.getMoviesDetails();

    expect(component.movieTmdb).toBe(movieTestData.movieTmdb);
    expect(component.movieOmdb).toBe(movieTestData.movieOmdb);
    expect(component.genres).toBe(movieTestData.movieTmdb.genres);
  });
});
