import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialDependenciesModule } from '../../../shared/app-material-dependencies.module';
import { AccordionComponent } from './accordion.component';
import * as movieData from '../../../shared/tests/data/movie-data.testdata.json';
import { NgRatingBarModule } from 'ng-rating-bar';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionComponent ],
      imports: [ AppMaterialDependenciesModule, NoopAnimationsModule, NgRatingBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    component.movieOmdb = movieData.movieOmdb;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all won awards', () => {
    component.getAwards();
    expect(component.oscars).toEqual([0,1,2,3,4]);
    expect(component.awards).toEqual('Another 64 wins & 51 nominations.');

  });
});
