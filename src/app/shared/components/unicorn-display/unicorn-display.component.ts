import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorUtil, HEX_COLOR_PATTERN } from '../../../core/utlis/colors.util';
import { Unicorn } from '../../../core/models/unicorn.model';
import { EUnicornGender } from '../../../core/enums/unicorn-gender.enum';
import { filter } from 'rxjs/operators';

class UnicornDisplay {
  bodyColor: string;
  criniereColor: string;
  hornColor: string;
  hornSecondaryColor: string;
  eyeColor: string;
}

@Component({
  selector: 'app-unicorn-display',
  templateUrl: './unicorn-display.component.html',
  styleUrls: ['./unicorn-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnicornDisplayComponent implements OnInit, OnDestroy {

	private _unicorn = new BehaviorSubject<Unicorn>(null);

	@Input()
	set unicorn(value) {
		this._unicorn.next(value);
	};

	get unicorn() {
		return this._unicorn.getValue();
	}

  unicornDisplay: UnicornDisplay;

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
      this.watchUnicorn();
  }

  private watchUnicorn(): void {
    this._unicorn.pipe(
      filter(unicornObs => !!unicornObs)
    ).subscribe((unicorn) => {
      this.paintUnicorn(unicorn);
    });
  }

  public ngOnDestroy(): void {
    this._unicorn.complete();
  }

  private paintUnicorn(unicorn: Unicorn): void {
    if (unicorn && !unicorn.color.match(HEX_COLOR_PATTERN)) {
      throw Error('invalid color');
    }

    const hornPrimaryColor = ColorUtil.stringToColour(unicorn.name);

    this.unicornDisplay = {
      bodyColor: unicorn.color,
      criniereColor: this.computeCriniereColor(unicorn.gender),
      eyeColor: unicorn.age >= 18 ? '#f41c00' : '#00000',
      hornColor: hornPrimaryColor,
      hornSecondaryColor: ColorUtil.stringToColour(hornPrimaryColor),
    } as UnicornDisplay;

    this.cdr.detectChanges();
  }

  private computeCriniereColor(gender: EUnicornGender): string | null {
    switch (gender) {
      case EUnicornGender.male:
        return '#6495ED';
      case EUnicornGender.female:
        return '#FFC0CB';
      case EUnicornGender.other:
      default:
        return '#F0E68C';
    }
  }
}
