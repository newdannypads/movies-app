import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { CreditsComponent } from './credits.component';
import { PosterPipe } from '../../../shared/pipes/poster.pipe';

describe('CreditsComponent', () => {
  let component: CreditsComponent;
  let fixture: ComponentFixture<CreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditsComponent, PosterPipe ],
      imports: [ NgxUsefulSwiperModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
