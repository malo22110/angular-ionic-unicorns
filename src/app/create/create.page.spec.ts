import { RouterTestingModule } from '@angular/router/testing';
import { NgxSerializerModule } from '@witty-services/ngx-serializer';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SharedModule } from '../shared/shared.module';
import { StorageService } from '../core/services/storage.service';
import { UnicornService } from '../core/services/unicorns.service';
import { CreatePage } from './create.page';
import { CreateTestPage } from './create.page.test';
import { UnicornMock } from '../core/models/unicorn.mock';
import { Router } from '@angular/router';

describe('CreatePage', () => {
  let component: CreatePage;
  let fixture: ComponentFixture<CreatePage>;
  let page: CreateTestPage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreatePage,
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NgxSerializerModule.forRoot(),
        IonicModule.forRoot(),
      ],
      providers: [
        Storage,
        StorageService,
        UnicornService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePage);
    component = fixture.componentInstance;
    page = new CreateTestPage(fixture);
  }));


  describe('INIT', () => {
    it('should watch watchUnicornFromValueChanges', () => {
      const spy = spyOn(component as any, 'watchUnicornFromValueChanges');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should paint Unicorn', () => {
      const spy = spyOn(component as any, 'paintUnicorn');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });


    it('should display name required error', () => {
      fixture.detectChanges();
      component.unicornForm.markAllAsTouched();
      fixture.detectChanges();

      expect(page.formNameErrorRequired).toBeTruthy();
    });
  });


  describe('#onClickSubmitForm', () => {
    it('should not submit unicorn if form invalid', () => {
      fixture.detectChanges();
      spyOnProperty(component.unicornForm, 'valid').and.returnValue(false);
      const spy = spyOn(TestBed.inject(UnicornService), 'addUnicorn');
      component.onClickSubmitForm();
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should submit unicorn if form valid', () => {
      fixture.detectChanges();
      spyOnProperty(component.unicornForm, 'valid').and.returnValue(true);
      const spy = spyOn(TestBed.inject(UnicornService), 'addUnicorn').and.returnValue(Promise.resolve(null));
      component.onClickSubmitForm();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should navigate home on success', async () => {
      fixture.detectChanges();
      spyOnProperty(component.unicornForm, 'valid').and.returnValue(true);
      const spy = spyOn(TestBed.inject(Router), 'navigate');
      spyOn(TestBed.inject(UnicornService), 'addUnicorn').and.returnValue(Promise.resolve([UnicornMock.unicornMockObj]));
      spyOn(component as any, 'presentSubmitSuccessToast');
      component.onClickSubmitForm();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalled();
    });

    it('should toast success', async () => {
      fixture.detectChanges();
      spyOnProperty(component.unicornForm, 'valid').and.returnValue(true);
      spyOn(TestBed.inject(Router), 'navigate');
      spyOn(TestBed.inject(UnicornService), 'addUnicorn').and.returnValue(Promise.resolve([UnicornMock.unicornMockObj]));
      const spy = spyOn(component as any, 'presentSubmitSuccessToast');
      component.onClickSubmitForm();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalled();
    });

    it('should toast an error', async () => {
      fixture.detectChanges();
      spyOnProperty(component.unicornForm, 'valid').and.returnValue(true);
      spyOn(TestBed.inject(UnicornService), 'addUnicorn').and.returnValue(Promise.reject());

      const spy = spyOn(component as any, 'presentSubmitErrorToast');
      component.onClickSubmitForm();

      await fixture.whenStable();
      expect(spy).toHaveBeenCalled();
    });
  });
});
