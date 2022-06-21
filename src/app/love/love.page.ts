import { takeUntil } from 'rxjs/operators';
import { Unicorn } from './../core/models/unicorn.model';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EUnicornGender } from '../core/enums/unicorn-gender.enum';
import { UnicornService } from '../core/services/unicorns.service';
import { ColorUtil } from '../core/utlis/colors.util';
import { EnumUtil } from '../core/utlis/enum.util';

@Component({
  selector: 'app-love',
  templateUrl: './love.page.html',
  styleUrls: ['./love.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LovePage implements OnInit, OnDestroy {

  unicornsMale: Unicorn[];
  unicornsFemale: Unicorn[];
  parent1: Unicorn;
  parent2: Unicorn;

  atLeastOneMaleAndOneFemale = false;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly unicornService: UnicornService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.unicornService.getAllUnicorns().pipe(takeUntil(this.onDestroy$)).subscribe((unicorns: Unicorn[]) => {
      this.unicornsMale = unicorns.filter((elem) => elem.age >= 18 && elem.gender === EUnicornGender.male);
      this.unicornsFemale = unicorns.filter((elem) => elem.age >= 18 && elem.gender === EUnicornGender.female);
    });
  }

  ngOnDestroy(): void {
    document.body.style.setProperty(`--selectedParent1Color`, null);
    document.body.style.setProperty(`--selectedParent2Color`, null);
    this.onDestroy$.complete();
  }

  onClickToggleParent1Selection(unicorn): void {
    if (!this.isCurrentParent1(unicorn)) {
      this.parent1 = unicorn;
      document.body.style.setProperty(`--selectedParent1Color`, unicorn.color);
    } else {
      document.body.style.setProperty(`--selectedParent1Color`, null);
      this.parent1 = null;
    }
    this.parent2 = null;
    document.body.style.setProperty(`--selectedParent2Color`, null);
  }

  isCurrentParent1(unicorn: Unicorn): boolean {
    return this.parent1 === unicorn;
  }

  onClickToggleParent2Selection(unicorn: Unicorn): void {
    if (!this.isCurrentParent2(unicorn)) {
      this.parent2 = unicorn;
      document.body.style.setProperty(`--selectedParent2Color`, unicorn.color);
    } else {
      this.parent2 = null;
      document.body.style.setProperty(`--selectedParent2Color`, null);
    }
  }

  isCurrentParent2(unicorn): boolean {
    return this.parent2 === unicorn;
  }

  onClickMakeABaby(): void {
    this.unicornService.addUnicorn(
      new Unicorn({
        name: `${this.parent1.name}${this.parent2.name}`,
        age: 1,
        gender: EUnicornGender[EnumUtil.randomEnumKey(EUnicornGender)],
        color: ColorUtil.blend(this.parent1.color, this.parent2.color)
      })
    ).then(_res => {
      this.parent1 = this.parent2 = null;
      this.router.navigate(['/', 'home']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
