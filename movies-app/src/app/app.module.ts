import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccordionComponent } from './dashboard/movie-detail/accordion/accordion.component';
import { MovieDetailComponent } from './dashboard/movie-detail/movie-detail.component';
import { VideosComponent } from './dashboard/movie-detail/videos/videos.component';
import { SearchComponent } from './dashboard/search/search.component';
import { ThumbnailComponent } from './dashboard/thumbnail/thumbnail.component';
import { AppMaterialDependenciesModule } from './shared/app-material-dependencies.module';
import { PosterPipe } from './shared/pipes/poster.pipe';
import { SanitizeUrlPipe } from './shared/pipes/sanitize-url.pipe';
import { SearchDialogComponent } from './dashboard/search-dialog/search-dialog.component';
import { CreditsComponent } from './dashboard/movie-detail/credits/credits.component';
import { NgRatingBarModule } from 'ng-rating-bar';
import { SidenavBarComponent } from './dashboard/sidenav-bar/sidenav-bar.component';
import { FavoritesComponent } from './dashboard/favorites/favorites.component';
import { ToolbarComponent } from './dashboard/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ThumbnailComponent,
    MovieDetailComponent,
    AccordionComponent,
    VideosComponent,
    CreditsComponent,
    SanitizeUrlPipe,
    PosterPipe,
    SearchComponent,
    SearchDialogComponent,
    SidenavBarComponent,
    FavoritesComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialDependenciesModule,
    RouterModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule,
    NgRatingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
