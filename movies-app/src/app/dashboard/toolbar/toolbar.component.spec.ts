import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppMaterialDependenciesModule } from '../../shared/app-material-dependencies.module';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  const MockRouter = {
    events: of(new NavigationEnd(0, '/favorites', '')),
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent, SearchDialogComponent],
      imports: [AppMaterialDependenciesModule, NoopAnimationsModule, ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useValue: MockRouter,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideModule(BrowserModule, {
        set: { entryComponents: [SearchDialogComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    jest.spyOn(component['dialog'], 'open');

    component.openDialog();

    expect(component['dialog'].open).toHaveBeenCalled();
  });

  it('should update the title of the toolbar', () => {
    const spanRoute = fixture.debugElement.query(By.css(`[data-test-selector='toolbar-title']`));

    expect(spanRoute.nativeElement.innerHTML).toBe('Favorites');
  });

  it('should emit sidenavEvent with false', () => {
    component.sidenavOpen = true;
    jest.spyOn(component.sidenavEvent, 'emit');
    component.toggleSideBar();

    expect(component.sidenavEvent.emit).toHaveBeenCalledWith(false);
  });

  it('should emit sidenavEvent with false', () => {
    component.sidenavOpen = false;
    jest.spyOn(component.sidenavEvent, 'emit');
    component.toggleSideBar();

    expect(component.sidenavEvent.emit).toHaveBeenCalledWith(true);
  });
});
