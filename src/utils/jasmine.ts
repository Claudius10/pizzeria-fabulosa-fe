import {MockedComponentFixture} from 'ng-mocks';
import {By} from '@angular/platform-browser';

export function findElement(fixture: MockedComponentFixture, selector: string): any {
  const debugElement = fixture.debugElement.query(By.css(`[data-test-key=${selector}]`));
  return debugElement === null ? null : debugElement.nativeElement;
}
