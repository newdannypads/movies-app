import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailComponent } from './thumbnail.component';
import * as moviesTrending from '../../shared/tests/data/movie-trending-data.testdata.json';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailComponent ]
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
