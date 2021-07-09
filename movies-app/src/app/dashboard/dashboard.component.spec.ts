import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { TmdbService } from './tmdb.service';
import * as moviesTrending from '../shared/tests/data/movie-trending-data.testdata.json';
import { MockComponent } from '../../../setup-jest';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tmdbService: TmdbService;

  beforeEach(
    waitForAsync(() => {
      const mockTmdbService = {
        getTmdbTrendingMovies: jest.fn(),
      };

      TestBed.configureTestingModule({
        declarations: [DashboardComponent, MockComponent('app-thumbnail', { inputs: [ 'movie' ] })],
        providers: [{ provide: TmdbService, useValue: mockTmdbService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    tmdbService = TestBed.inject(TmdbService);
    jest.spyOn(tmdbService, 'getTmdbTrendingMovies').mockReturnValue(of(moviesTrending.moviesTrendingData));
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
