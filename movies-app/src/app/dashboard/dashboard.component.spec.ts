import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { AppMaterialDependenciesModule } from '../shared/app-material-dependencies.module';
import * as moviesTrending from '../shared/tests/data/movie-trending-data.testdata.json';
import { DashboardComponent } from './dashboard.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { TmdbService } from './tmdb.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tmdbService: TmdbService;

  beforeEach(
    waitForAsync(() => {
      const mockTmdbService = {
        getTmdbTrendingMovies: jest.fn(() => {
          return of(moviesTrending.moviesTrendingData.results)
        }),
        getTmdbGenreMovies: jest.fn(() => {
          return of()
        }),
      };

      TestBed.configureTestingModule({
        declarations: [DashboardComponent, MockComponent(ThumbnailComponent)],
        imports: [AppMaterialDependenciesModule, NoopAnimationsModule ],
        providers: [{ provide: TmdbService, useValue: mockTmdbService }],
      }).compileComponents();
    })
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
    component.getTrendingMovies();

    expect(tmdbService.getTmdbTrendingMovies).toHaveBeenCalledWith();
  });

  it('should call all genres of movies', () => {
    component.getMoviesGenre();

    expect(tmdbService.getTmdbGenreMovies).toHaveBeenCalledWith();
  });
});
