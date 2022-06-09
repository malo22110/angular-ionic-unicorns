import { takeUntil } from 'rxjs/operators';
import { Unicorn } from './../core/models/unicorn.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';
import { EUnicornGender } from '../core/enums/unicorn-gender.enum';
import { UnicornService } from '../core/services/unicorns.service';
import { ColorUtil } from '../core/utlis/colors.util';
import { EnumUtil } from '../core/utlis/enum.util';

@Component({
  selector: 'app-love',
  templateUrl: './love.page.html',
  styleUrls: ['./love.page.scss'],
})
export class LovePage implements OnInit, OnDestroy {

  unicornsMale: Unicorn[];
  unicornsFemale: Unicorn[];
  parent1: Unicorn;
  parent2: Unicorn;

  atLeastOneMaleAndOneFemale = false;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly storageService: StorageService,
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
    this.onDestroy$.complete();
  }

  onClickToggleParent1Selection(unicorn): void {
    if (!this.isCurrentParent1(unicorn)) {
      this.parent1 = unicorn;
    } else {
      this.parent1 = null;
    }
    this.parent2 = null;
  }

  isCurrentParent1(unicorn: Unicorn): boolean {
    return this.parent1 === unicorn;
  }

  onClickToggleParent2Selection(unicorn: Unicorn): void {
    if (!this.isCurrentParent2(unicorn)) {
      this.parent2 = unicorn;
    } else {
      this.parent2 = null;
    }
  }

  isCurrentParent2(unicorn): boolean {
    return this.parent2 === unicorn;
  }

  onClickMakeABaby(): void {
    this.storageService.addUnicorn(
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
