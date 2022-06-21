import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OnDestroyListener, takeUntilDestroy } from '@paddls/ngx-common';
import { BehaviorSubject } from 'rxjs';
import { EUnicornGender } from '../core/enums/unicorn-gender.enum';
import { Unicorn } from '../core/models/unicorn.model';
import { UnicornService } from '../core/services/unicorns.service';
import { ColorUtil, HEX_COLOR_PATTERN } from '../core/utlis/colors.util';

@OnDestroyListener()
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePage implements OnInit, OnDestroy {

  // Gender select input values
  public unicornGenderValues = Object.values(EUnicornGender);
  public unicornForm: FormGroup;
  public unicornObs: BehaviorSubject<Unicorn> = new BehaviorSubject<Unicorn>(null);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly unicornService: UnicornService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    public readonly toastController: ToastController
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
    this.unicornForm.reset();
  }

  onClickRandomizeColor() {
    this.unicornForm.get('color').patchValue(ColorUtil.randomColor());
  }

  onClickSubmitForm() {
    if (this.unicornForm.valid) {
      this.unicornService.addUnicorn(this.unicornForm.value).then(_res => {
        this.presentSubmitSuccessToast();
        this.router.navigate(['/', 'home']);
      }).catch((_error) => this.presentSubmitErrorToast());
    }
  }

  private async presentSubmitSuccessToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Unicorn saved !',
      duration: 2000
    });
    toast.present();
  }

  private async presentSubmitErrorToast() {
    const toast = await this.toastController.create({
      color: 'error',
      message: 'Error occured while saving unicorn, please try again.',
      duration: 2000
    });
    toast.present();
  }

  private paintUnicorn(value) {
    this.unicornObs.next(value);
  }

  private watchUnicornFromValueChanges(): void {
    this.unicornForm.valueChanges.pipe(
      takeUntilDestroy(this)
    ).subscribe(values => {
      this.paintUnicorn(values);
      this.cdr.markForCheck();
    });
  }
}
