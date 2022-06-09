import { DebugElement } from '@angular/core';
import { ComponentDriver } from '../component-driver';
import { CreatePage } from './create.page';

export class CreateTestPage extends ComponentDriver<CreatePage> {

  get formNameErrorRequired(): DebugElement {
    return this.queryByTestId('form-name-error-required');
  }

  get formNameErrorMinlength(): DebugElement {
    return this.queryByTestId('form-name-error-minlength');
  }

    get formAgeErrorRequired(): DebugElement {
    return this.queryByTestId('form-age-error-required');
  }

  get formAgeErrorMin(): DebugElement {
    return this.queryByTestId('form-age-error-min');
  }

  get formAgeErrorMax(): DebugElement {
    return this.queryByTestId('form-age-error-max');
  }
}
