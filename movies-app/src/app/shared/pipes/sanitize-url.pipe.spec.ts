import { DomSanitizer } from '@angular/platform-browser';
import { SanitizeUrlPipe } from './sanitize-url.pipe';

describe('SanitizeUrlPipe', () => {
  it('create an instance', () => {
    let _sanitizer: DomSanitizer;
    const pipe = new SanitizeUrlPipe(_sanitizer);
    expect(pipe).toBeTruthy();
  });
});
