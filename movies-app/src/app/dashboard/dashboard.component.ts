import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  movies = [
    {
      name: "Forrest Gump"
    },
    {
      name: "Up"
    },
    {
      name: "The lord of the rings"
    }
  ]
  ngOnInit(): void {
  }

}
