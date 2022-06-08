import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EUnicornGender } from '../core/enums/unicorn-gender.enum';
import { Unicorn } from '../core/models/unicorn.model';
import { StorageService } from '../core/services/storage.service';
import { ColorUtil, HEX_COLOR_PATTERN } from '../core/utlis/colors.util';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, OnDestroy {

  // Gender select input values
  public unicornGenderValues = Object.values(EUnicornGender);
  public unicornForm: FormGroup;
  public unicornObs: Subject<Unicorn> = new Subject<Unicorn>();

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,

  ) { }

  ngOnInit() {
    this.unicornForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10)
        ]
      ],
      age: [
        18,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(999)
        ]
      ],
      gender: [
        EUnicornGender.other,
        Validators.required,
      ],
      color: [
        ColorUtil.randomColor(),
        [
          Validators.required,
          Validators.pattern(HEX_COLOR_PATTERN)
        ]
      ]
    });

    this.watchUnicornFromValueChanges();
    this.paintUnicorn(this.unicornForm.value);
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.unicornObs.complete();
    this.unicornForm.reset();
  }

  onClickRandomizeColor() {
    this.unicornForm.get('color').patchValue(ColorUtil.randomColor());
  }

  onClickSubmitForm() {
    if (this.unicornForm.valid) {
      this.storageService.addUnicorn(this.unicornForm.value).then(_res => {
        this.router.navigate(['/', 'home']);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  private paintUnicorn(value) {
    this.unicornObs.next(value);
  }

  private watchUnicornFromValueChanges(): void {
    this.unicornForm.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(values => {
      this.paintUnicorn(values);
      this.cdr.detectChanges();
    });
  }
}