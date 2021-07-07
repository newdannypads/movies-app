import { Component, Input } from '@angular/core';
import { ThumbnailComponent } from '../../../dashboard/thumbnail/thumbnail.component';

@Component({
  selector: 'app-thumbnail',
  template: '<div></div>',
  providers: [
    { provide: ThumbnailComponent, useClass: MockThumbnailComponent },
  ],
})
export class MockThumbnailComponent {
  @Input() name;
}
