import { DebugElement } from '@angular/core';
import { ComponentDriver } from '../component-driver';
import { HomePage } from './home.page';

export class HomeTestPage extends ComponentDriver<HomePage> {

  get unicornsList(): DebugElement {
    return this.queryByTestId('unicorns-list');
  }

  get emptyState(): DebugElement {
    return this.queryByTestId('empty-state');
  }

  get btnMakeLove(): DebugElement {
    return this.queryByTestId('btn-make-love');
  }

  get btnCreate(): DebugElement {
    return this.queryByTestId('btn-create');
  }

  getUnicornName(index: number): DebugElement {
    return this.queryByTestId(`unicorn-name-${index}`);
  }

  getUnicornAge(index: number): DebugElement {
    return this.queryByTestId(`unicorn-age-${index}`);
  }

  getUnicornGender(index: number): DebugElement {
    return this.queryByTestId(`unicorn-gender-${index}`);
  }
}
