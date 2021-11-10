import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './dashboard/movie-detail/movie-detail.component';
import { SearchComponent } from './dashboard/search/search.component';
import { SidenavBar } from './dashboard/sidenav-bar/sidenav-bar.interface';
import { FavoritesComponent } from './dashboard/favorites/favorites.component';


const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', component: DashboardComponent },
];

export const sidenavRoutes: SidenavBar[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    route: '/home',
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: 'favorite',
    route: '/favorites',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
