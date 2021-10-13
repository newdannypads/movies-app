import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailComponent } from './thumbnail.component';
import * as moviesTrending from '../../shared/tests/data/movie-trending-data.testdata.json';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    component.movie = moviesTrending.moviesTrendingData.results[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
