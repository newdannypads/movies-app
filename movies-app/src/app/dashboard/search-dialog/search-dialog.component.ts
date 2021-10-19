import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  searchForm = new FormGroup({
    query: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchMovies(){
    this.router.navigateByUrl(`search/${ this.searchForm.controls['query'].value }`)
  }

}
