import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './dashboard/movie-detail/movie-detail.component';
import { SearchComponent } from './dashboard/search/search.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: '**', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
