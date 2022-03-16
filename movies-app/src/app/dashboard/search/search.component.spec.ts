import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TmdbService } from '../tmdb.service';
import * as movies from '../../shared/tests/data/movie-now-playin-data.testdata.json';
import { SearchComponent } from './search.component';
import { MockComponent } from 'ng-mocks';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: name => {
          const mock = {
            'query': 'test',
          };
          return mock[name];
        },
      },
    },
  };

  const mockTmdbService = {
    searchMovie: jest.fn(() => of(movies.moviesNowPlayingData.results))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent, MockComponent(SliderComponent) ],
      providers: [
        { provide: TmdbService, useValue: mockTmdbService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports:[ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search components', () => {
    expect(mockTmdbService.searchMovie).toHaveBeenCalledWith('test');
  });
});
