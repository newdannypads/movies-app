import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  query: string;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.paramMap.get('query');
    this.searchMovies();
  }

  searchMovies(){
    this.tmdbService.searchMovie(this.query).subscribe(console.log )
  }



}
