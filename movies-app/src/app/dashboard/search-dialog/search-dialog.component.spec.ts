import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchDialogComponent } from './search-dialog.component';
import { AppMaterialDependenciesModule } from '../../shared/app-material-dependencies.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { SearchComponent } from '../search/search.component';
import { MockComponent } from 'ng-mocks';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchDialogComponent, MockComponent(SearchComponent)],
      imports: [
        AppMaterialDependenciesModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'search/:query', component: MockComponent(SearchComponent) },
          { path: "**", redirectTo: "" }
        ])
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the correct url', fakeAsync(() => {
    const query = 'test';
    component.searchForm.controls['query'].setValue(query)
    jest.spyOn(component['router'], 'navigateByUrl');

    fixture.ngZone.run(() => {
      component.searchMovies();
    });
    tick();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith(`search/${ query }`);
  }));
});
