import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { AppComponent } from './app.component';
import { SidenavBarComponent } from './dashboard/sidenav-bar/sidenav-bar.component';
import { ToolbarComponent } from './dashboard/toolbar/toolbar.component';
import { AppMaterialDependenciesModule } from './shared/app-material-dependencies.module';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponents(SidenavBarComponent, ToolbarComponent)],
      imports: [RouterTestingModule, AppMaterialDependenciesModule, NoopAnimationsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
