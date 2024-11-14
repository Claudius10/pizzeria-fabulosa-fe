import {MockedComponentFixture} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

export function findNativeElement(fixture: MockedComponentFixture, selector: string): any {
  const debugElement = fixture.debugElement.query(By.css(`[data-test-key=${selector}]`));
  return debugElement === null ? null : debugElement.nativeElement;
}

export function findDebugElement(fixture: MockedComponentFixture, selector: string): DebugElement | null {
  const debugElement = fixture.debugElement.query(By.css(`[data-test-key=${selector}]`));
  return debugElement === null ? null : debugElement;
}
