import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './dashboard/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'detail/:id', component: MovieDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
