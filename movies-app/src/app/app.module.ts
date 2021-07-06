import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialDependenciesModule } from './shared/app-material-dependencies.module';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThumbnailComponent } from './dashboard/thumbnail/thumbnail.component';
import { MovieDetailComponent } from './dashboard/movie-detail/movie-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ThumbnailComponent,
    MovieDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialDependenciesModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
