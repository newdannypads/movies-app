import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { AppMaterialDependenciesModule } from '../shared/app-material-dependencies.module';
import * as movies from '../shared/tests/data/movie-now-playin-data.testdata.json';
import * as genres from '../shared/tests/data/movie-genres-data.testdata.json';
import { DashboardComponent } from './dashboard.component';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { TmdbService } from './tmdb.service';
import { NowPlaying } from './movies-trending.interface';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tmdbService: TmdbService;
  const moviesService: NowPlaying = (movies.moviesNowPlayingData as any);

  beforeEach(
    async() => {
      const mockTmdbService = {
        getTmdbNowPlayingMovies: jest.fn(() => {
          return of(moviesService)
        }),
        getTmdbGenreMovies: jest.fn(() => {
          return of(genres.moviesGenresData)
        }),
      };

      await TestBed.configureTestingModule({
        declarations: [DashboardComponent, MockComponent(SliderComponent)],
        imports: [AppMaterialDependenciesModule, NoopAnimationsModule ],
        providers: [{ provide: TmdbService, useValue: mockTmdbService }],
      }).compileComponents();
    }
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    tmdbService = TestBed.inject(TmdbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service to get the trending movies', () => {
    const mockComponent = ngMocks.find<SliderComponent>('app-slider').componentInstance;

    fixture.detectChanges();

    expect(mockComponent.movies).toEqual(moviesService.results);
    expect(tmdbService.getTmdbNowPlayingMovies).toHaveBeenCalledWith();
  });
});
