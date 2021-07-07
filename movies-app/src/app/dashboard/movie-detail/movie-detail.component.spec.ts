import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AppMaterialDependenciesModule } from '../../shared/app-material-dependencies.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      imports: [ NgImageSliderModule, AppMaterialDependenciesModule, NoopAnimationsModule ]
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
});
