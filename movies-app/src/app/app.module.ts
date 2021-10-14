import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NgImageSliderModule } from 'ng-image-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccordionComponent } from './dashboard/movie-detail/accordion/accordion.component';
import { MovieDetailComponent } from './dashboard/movie-detail/movie-detail.component';
import { VideosComponent } from './dashboard/movie-detail/videos/videos.component';
import { ThumbnailComponent } from './dashboard/thumbnail/thumbnail.component';
import { AppMaterialDependenciesModule } from './shared/app-material-dependencies.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ThumbnailComponent,
    MovieDetailComponent,
    AccordionComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialDependenciesModule,
    NgImageSliderModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
