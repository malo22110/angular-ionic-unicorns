import { Component, Input, OnChanges, OnDestroy, SimpleChanges, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ColorUtil, HEX_COLOR_PATTERN } from '../../../core/utlis/colors.util';
import { Unicorn } from '../../../core/models/unicorn.model';
import { EUnicornGender } from '../../../core/enums/unicorn-gender.enum';

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
export class UnicornDisplayComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public unicorn: Unicorn;

  @Input()
  public unicornObs: Observable<Unicorn>;

  unicornDisplay: UnicornDisplay;

  private colorSubscription: Subscription;

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.unicorn) {
      this.paintUnicorn(this.unicorn);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('unicornObs' in changes) {
      if (this.colorSubscription) {
        this.colorSubscription.unsubscribe();
      }

      this.colorSubscription = changes.unicornObs.currentValue.subscribe((unicorn: Unicorn) => {
        if (unicorn && !unicorn.color.match(HEX_COLOR_PATTERN)) {
          throw Error('invalid color');
        }
        this.unicorn = unicorn;
        this.paintUnicorn(unicorn);
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }

  private paintUnicorn(unicorn: Unicorn): void {
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
