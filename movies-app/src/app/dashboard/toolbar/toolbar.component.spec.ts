import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppMaterialDependenciesModule } from '../../shared/app-material-dependencies.module';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent, SearchDialogComponent],
      imports: [
        RouterTestingModule,
        AppMaterialDependenciesModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      // providers: [
      //   {
      //     provide: Router,
      //     useValue: {
      //       url: 'business/create',
      //       events: of(new NavigationEnd(0, 'http://localhost:4200/business/create','')),
      //       navigate: jest.fn()
      //     }
      //   }
      // ],
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

  xit('should update the title of the toolbar', () => {
    // jest
    //   .spyOn<any, any>(component['router'], 'events')
    //   .mockReturnValue(
    //     of(new NavigationEnd(0, '/pdp/project-details/4/edit', 'pdp/project-details/4/edit'))
    //   );

    // component['verifyUrl']();

    // expect(component.toolBarTitle).toBe('favorites');

    //const route = new NavigationEnd(0, '/pdp/project-details/4/edit', 'pdp/project-details/4/edit');

    // jest
    //   .spyOn<any, any>(TestBed.inject(Router), 'events')
    //   .mockReturnValue(of({ url: '/pdp/project-details/4/edit' }));
    component['verifyUrl']();

    expect(component.toolBarTitle).toBe('favorites');
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
