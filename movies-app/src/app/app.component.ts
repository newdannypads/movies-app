import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from './dashboard/search/search.component';
import { SearchDialogComponent } from './dashboard/search-dialog/search-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-app';

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(SearchDialogComponent,{
      position: { right: '3rem', top: '3rem'}
    });
  }
}
