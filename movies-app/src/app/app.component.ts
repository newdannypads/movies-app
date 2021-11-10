import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { sidenavRoutes } from './app-routing.module';
import { SidenavBar } from './dashboard/sidenav-bar/sidenav-bar.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Movies';
  mobile$: Observable<boolean>;
  sidenavConfig: SidenavBar[] = sidenavRoutes;
  sidenavOpen: boolean = false;

  constructor() {}
}
