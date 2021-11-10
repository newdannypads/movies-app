import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SidenavBar } from './sidenav-bar.interface';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss']
})
export class SidenavBarComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() sidenavConfig: SidenavBar[] = [];
  @Input() mobile = false;
  @Input() mode = 'over';

  @Input() set open(value: boolean ){
    if(this.sidenav){
      value === true ? this.sidenav.open() : this.sidenav.close();
    }
  }

  ngOnInit(): void {
  }
}
