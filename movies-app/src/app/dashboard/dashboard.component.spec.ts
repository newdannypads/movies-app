import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { TmdbService } from './tmdb.service';
import * as moviesTrending from '../shared/tests/data/movie-trending-data.testdata.json';
import { AppMaterialDependenciesModule } from '../shared/app-material-dependencies.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tmdbService: TmdbService;

  beforeEach(
    waitForAsync(() => {
      const mockTmdbService = {
        getTmdbTrendingMovies: jest.fn(() => {
          return of(moviesTrending.moviesTrendingData)
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
});
