import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MovieOmdb } from '../../movie-omdb.interface';
import { MovieTmdb } from '../../movie-tmdb.interface';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {

  @Input() movieOmdb: MovieOmdb;
  @Input() movieTmdb: MovieTmdb;
  @Input() genres;

  oscars: number[];
  awards: string;

  constructor() {

  }

  ngOnInit(): void {
    this.getAwards();
   }

  getAwards() {
    this.movieOmdb.Awards.split('. ').map(
      (award) => {
        if( award.includes('Oscar')){
          const numberOfOscars = +award.split(' ')[1];
          this.oscars = Array.from(Array(numberOfOscars).keys())
        }else{
          this.awards = award.trim();
        }
      }
    );
  }

}
