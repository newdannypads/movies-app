import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppMaterialDependenciesModule } from './shared/app-material-dependencies.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { SearchDialogComponent } from './dashboard/search-dialog/search-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppMaterialDependenciesModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        SearchDialogComponent
      ],
    })
    .overrideModule(BrowserModule, {
      set: { entryComponents: [ SearchDialogComponent ] },
    })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open dialog', () => {
    jest.spyOn(app['dialog'], 'open');

    app.openDialog();

    expect(app['dialog'].open).toHaveBeenCalled();
  });

  // it(`should have as title 'movies-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('movies-app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('movies-app app is running!');
  // });
});
