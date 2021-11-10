import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import * as movieTestData from '../../shared/tests/data/movie-data.testdata.json';
import * as movieCastData from '../../shared/tests/data/movie-cast.json';
import * as videos from '../../shared/tests/data/movie-videos.json';
import { OmdbService } from '../omdb.service';
import { TmdbService } from '../tmdb.service';
import { AccordionComponent } from './accordion/accordion.component';
import { MovieDetailComponent } from './movie-detail.component';
import { VideosComponent } from './videos/videos.component';
import { PosterPipe } from '../../shared/pipes/poster.pipe';
import { CreditsComponent } from './credits/credits.component';
import { AppMaterialDependenciesModule } from '../../shared/app-material-dependencies.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const mockTmdbService = {
    getTmdbMovie: jest.fn(() => of(movieTestData.movieTmdb)),
    getCastMovie: jest.fn(() => of(movieCastData.credits.cast)),
    getTmdbVideoMovies: jest.fn(() => of(videos.movieVideo)),
  };

  const mockOmdbService = {
    getOmdbMovie: jest.fn(() => of(movieTestData.movieOmdb)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MovieDetailComponent,
        MockComponents(AccordionComponent, VideosComponent, CreditsComponent),
       PosterPipe
      ],
      imports: [RouterTestingModule, AppMaterialDependenciesModule, NoopAnimationsModule],
      providers: [
        { provide: TmdbService, useValue: mockTmdbService },
        { provide: OmdbService, useValue: mockOmdbService },
      ],
    }).compileComponents();
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
    const movieId = 'movieId';
    component.movieId = 'movieId';

    component.getMoviesDetails();

    expect(mockTmdbService.getTmdbMovie).toHaveBeenCalledWith(movieId);
  });

  it('should call castMovie', () => {
    const movieId = 'movieId';
    component.movieId = 'movieId';

    component.getMoviesDetails();

    expect(mockTmdbService.getCastMovie).toHaveBeenCalledWith(movieId);
  });

  it('should call castMovie', () => {
    const movieId = 'movieId';
    component.movieId = 'movieId';

    component.getMoviesDetails();

    expect(mockTmdbService.getTmdbVideoMovies).toHaveBeenCalledWith(movieId);
  });

  it('should call omdbMovie with tmdbId', fakeAsync(() => {
    component.getMoviesDetails();
    tick();

    expect(mockOmdbService.getOmdbMovie).toHaveBeenCalledWith(
      movieTestData.movieTmdb.imdb_id
    );
  }));

  it('should set the correct values', () => {
    component.getMoviesDetails();

    expect(component.movieTmdb).toBe(movieTestData.movieTmdb);
    expect(component.movieOmdb).toBe(movieTestData.movieOmdb);
    expect(component.genres).toBe(movieTestData.movieTmdb.genres);
  });

  it('should get all favorites in localStorage', () => {
    jest.spyOn(localStorage, 'getItem');
    component['getFavorites']();

    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should call getFavorites when setFavorite movie is executed', () => {
    jest.spyOn<any, any>( component, 'getFavorites');
    component.setFavorite();

    expect(component['getFavorites']).toHaveBeenCalledWith();
  });

  it('should add as a favorite when setFavorite movie is executed', () => {
    const movieId = 'ABC123';
    component.movieId = movieId;
    component.favorite = false;
    const returnValue = { selectedFavorites: [], movieSelected: undefined };
    jest.spyOn<any, any>( component, 'getFavorites').mockReturnValue(returnValue);
    jest.spyOn(localStorage, 'setItem');

    component.setFavorite();

    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([{ id: movieId }]));
    expect(component.favorite).toBe(true);
  });

  it('should remove favorite when setFavorite movie is executed', () => {
    const movieId = 'ABC123';
    component.movieId = movieId;
    component.favorite = true;
    const returnValue = { selectedFavorites: [{ id: movieId }, { id: 'DEF456'}], movieSelected: { id: movieId } };
    jest.spyOn<any, any>( component, 'getFavorites').mockReturnValue(returnValue);
    jest.spyOn(localStorage, 'setItem');

    component.setFavorite();

    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([{ id: 'DEF456' }]));
    expect(component.favorite).toBe(false);
  });
});
