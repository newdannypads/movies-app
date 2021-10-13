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

  constructor() { }

  ngOnInit(): void { }

}
