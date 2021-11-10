import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Output() sidenavEvent: EventEmitter<boolean> = new EventEmitter();
  sidenavOpen: boolean = false;
  toolBarTitle: string;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.verifyUrl();
  }

  openDialog() {
    this.dialog.open(SearchDialogComponent, {
      position: { right: '3rem', top: '3rem' },
    });
  }

  private verifyUrl() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.toolBarTitle = event.url.split('/')[1];
    });
  }

  toggleSideBar(){
    this.sidenavOpen = !this.sidenavOpen;
    this.sidenavEvent.emit(this.sidenavOpen);
  }
}
