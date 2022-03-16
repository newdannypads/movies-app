import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import * as movieTestData from '../../shared/tests/data/movie-data.testdata.json';
import { TmdbService } from '../tmdb.service';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const mockTmdbService = {
    getTmdbMovie: jest.fn(() => of(movieTestData.movieTmdb)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent, MockComponent(SliderComponent) ],
      providers: [ { provide: TmdbService, useValue: mockTmdbService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call 3 favorites movies', () => {
    const favoriteMovies = [
      { id: 'ABC123'},
      { id: 'DEF123'},
      { id: 'GHI123'},
    ]

    jest.spyOn(localStorage, 'getItem').mockReturnValue( JSON.stringify(favoriteMovies));
    jest.spyOn<any,any>(component, 'getMovieData');

    component.getFavoritesMovies();
    fixture.detectChanges();

    favoriteMovies.forEach(movie => {
      expect(mockTmdbService.getTmdbMovie).toHaveBeenCalledWith(movie.id);
    });

    expect(mockTmdbService.getTmdbMovie).toHaveBeenCalledTimes(favoriteMovies.length);
    expect(component['getMovieData']).toHaveBeenCalled();
  });

});
