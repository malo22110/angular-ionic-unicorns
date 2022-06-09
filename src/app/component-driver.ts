import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class ComponentDriver<T> {

  constructor(
    protected fixture: ComponentFixture<T>
  ) { }

  public dispatchEvent(element: DebugElement, type: string) {
    element.nativeElement.dispatchEvent(new Event(type));
  }

  protected queryByTestId(testId: string): DebugElement {
    return this.fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  }

  protected queryAllByTestId(testId: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(`[data-testid="${testId}"]`));
  }
}
